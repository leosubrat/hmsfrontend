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
}