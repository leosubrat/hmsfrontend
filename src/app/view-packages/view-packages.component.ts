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
        
        // Show success toast message
        this.showSuccessToast('Package booked successfully!');
        
   
      },
      (error) => {
        console.error('Error approving package:', error);
        this.errorMessage = 'Failed to approve package. Please try again.';
        this.cancelApprove();
        this.approveInProgress = false;
      }
    );
  }

  private bookedPackageIds: number[] = [];

addToBookedPackages(packageId: number): void {
  if (!this.bookedPackageIds.includes(packageId)) {
    this.bookedPackageIds.push(packageId);
  }
}

isPackageBooked(packageId: number): boolean {
  return this.bookedPackageIds.includes(packageId);
}

showSuccessToast(message: string): void {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast
  const toast = document.createElement('div');
  toast.style.backgroundColor = '#28a745';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '4px';
  toast.style.marginBottom = '10px';
  toast.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  toast.style.animation = 'fadeIn 0.3s ease-in';
  toast.innerText = message;
  
  // Add keyframes for fadeIn animation
  if (!document.getElementById('toast-animations')) {
    const style = document.createElement('style');
    style.id = 'toast-animations';
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add toast to container
  toastContainer.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 300);
  }, 3000);
}
}