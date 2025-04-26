import { Component, OnInit } from '@angular/core';
import { AdminPackage } from '../models/admin.model';
import { PackageService } from '../services/package.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approved-package',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './approved-package.component.html',
  styleUrl: './approved-package.component.css'
})
export class ApprovedPackagesComponent implements OnInit {
  approvedPackages: AdminPackage[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.loadApprovedPackages();
  }

  loadApprovedPackages(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.packageService.getApprovedPackages().subscribe(
      (response) => {
        this.approvedPackages = response.data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading approved packages:', error);
        this.errorMessage = 'Failed to load approved packages. Please try again.';
        this.isLoading = false;
      }
    );
  }
}
