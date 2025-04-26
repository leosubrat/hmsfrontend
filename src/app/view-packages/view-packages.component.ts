// view-packages.component.ts
import { Component, OnInit, Input } from '@angular/core';
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
  @Input() userView: boolean = false; // Flag to determine if this is user view

  packages: AdminPackage[] = [];
  isLoading = false;
  errorMessage = '';
  packageToDelete: AdminPackage | null = null;
  deleteInProgress = false;
  showDeleteConfirm = false;
  selectedPackage: AdminPackage | null = null;
  showApproveConfirm = false;
  approveInProgress = false;

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
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  cancelDelete(): void {
    this.packageToDelete = null;
    this.showDeleteConfirm = false;
    // Re-enable scrolling
    document.body.style.overflow = '';
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
        // Re-enable scrolling
        document.body.style.overflow = '';
      },
      error: (error) => {
        console.error('Error deleting package:', error);
        this.errorMessage = 'Failed to delete the package. Please try again.';
        this.deleteInProgress = false;
        this.showDeleteConfirm = false;
        // Re-enable scrolling
        document.body.style.overflow = '';
      }
    });
  }

  // For user view - approve package
  confirmApprove(pkg: AdminPackage): void {
    this.selectedPackage = pkg;
    this.showApproveConfirm = true;
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  cancelApprove(): void {
    this.selectedPackage = null;
    this.showApproveConfirm = false;
    // Re-enable scrolling
    document.body.style.overflow = '';
  }

  approvePackage(): void {
    if (!this.selectedPackage || this.selectedPackage.packageId === undefined) {
      console.error('Cannot approve package: Package ID is undefined');
      return;
    }
    
    this.approveInProgress = true;
    
    this.packageService.approvePackage(this.selectedPackage.packageId).subscribe(
      (response) => {
        console.log('Package approved successfully:', response);
        this.cancelApprove();
        this.approveInProgress = false;
        this.loadPackages();
      },
      (error) => {
        console.error('Error approving package:', error);
        this.errorMessage = 'Failed to approve package. Please try again.';
        this.cancelApprove();
        this.approveInProgress = false;
      }
    );
  }
}