import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPackageService } from '../admin-dashboard/admin.service';
import { AdminPackage } from '../models/admin.model';

@Component({
  selector: 'app-view-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.scss']
})
export class ViewPackagesComponent implements OnInit {
  packages: AdminPackage[] = [];
  isLoading = false;
  errorMessage = '';
  packageToDelete: AdminPackage | null = null;
  deleteInProgress = false;
  showDeleteConfirm = false;

  constructor(private packageService: AdminPackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.packageService.getAllPackages().subscribe({
      next: (data) => {
        this.packages = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load packages. Please try again.';
        this.isLoading = false;
        console.error('Error loading packages:', error);
      }
    });
  }

  confirmDelete(pkg: AdminPackage): void {
    this.packageToDelete = pkg;
    this.showDeleteConfirm = true;
    // Scroll to the confirmation section
    setTimeout(() => {
      const element = document.querySelector('.confirm-delete-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  cancelDelete(): void {
    this.packageToDelete = null;
    this.showDeleteConfirm = false;
  }

  deletePackage(): void {
    if (!this.packageToDelete || this.packageToDelete.packageId === undefined) {
      return;
    }
    
    this.deleteInProgress = true;
    const packageId = this.packageToDelete.packageId;
    
    this.packageService.deletePackage(packageId).subscribe({
      next: () => {
        // Remove the package from the array
        this.packages = this.packages.filter(p => p.packageId !== packageId);
        this.showDeleteConfirm = false;
        this.packageToDelete = null;
        this.deleteInProgress = false;
      },
      error: (error) => {
        console.error('Error deleting package:', error);
        this.errorMessage = 'Failed to delete the package. Please try again.';
        this.deleteInProgress = false;
        this.showDeleteConfirm = false;
        // Scroll back to the top to show the error
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
