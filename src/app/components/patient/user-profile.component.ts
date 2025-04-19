// src/app/components/user/profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../models/doctor.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h2>My Profile</h2>
        <p>Manage your personal information</p>
      </div>
      
      <div *ngIf="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading your profile information...</p>
      </div>
      
      <div *ngIf="error" class="error-container">
        <div class="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <p>{{ error }}</p>
        <button (click)="loadUserProfile()" class="retry-btn">Try Again</button>
      </div>
      
      <form *ngIf="!loading && !error" (ngSubmit)="saveProfile()" #profileForm="ngForm" class="profile-form">
        <div class="user-avatar">
          <div class="avatar-circle">
            <span>{{ getUserInitials() }}</span>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName"
              [(ngModel)]="userProfile.firstName" 
              #firstName="ngModel"
              required
              class="form-control"
              [class.error]="firstName.invalid && firstName.touched"
            >
            <small *ngIf="firstName.invalid && firstName.touched" class="error-text">First name is required</small>
          </div>
          
          <div class="form-group">
            <label for="middleName">Middle Name (Optional)</label>
            <input 
              type="text" 
              id="middleName" 
              name="middleName"
              [(ngModel)]="userProfile.middleName" 
              class="form-control"
            >
          </div>
          
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              [(ngModel)]="userProfile.lastName" 
              #lastName="ngModel"
              required
              class="form-control"
              [class.error]="lastName.invalid && lastName.touched"
            >
            <small *ngIf="lastName.invalid && lastName.touched" class="error-text">Last name is required</small>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              [(ngModel)]="userProfile.email" 
              class="form-control"
              disabled
            >
            <small class="hint-text">Email cannot be changed</small>
          </div>
          
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              [(ngModel)]="userProfile.phone" 
              #phone="ngModel"
              required
              pattern="[0-9]{10}"
              class="form-control"
              [class.error]="phone.invalid && phone.touched"
            >
            <small *ngIf="phone.invalid && phone.touched" class="error-text">
              Please enter a valid 10-digit phone number
            </small>
          </div>
        </div>
        
        <div class="form-actions">
          <button 
            type="button" 
            class="cancel-btn" 
            (click)="resetChanges()"
            [disabled]="saving"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            class="save-btn" 
            [disabled]="profileForm.invalid || !profileForm.dirty || saving"
          >
            <span *ngIf="!saving">Save Changes</span>
            <span *ngIf="saving" class="btn-spinner"></span>
          </button>
        </div>
      </form>
      
      <div *ngIf="saveSuccess" class="success-toast">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
        <span>Profile updated successfully!</span>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      padding: 0;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    
    .profile-header {
      padding: 30px;
      background: linear-gradient(135deg, #4db6ac 0%, #26a69a 100%);
      color: white;
    }
    
    .profile-header h2 {
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 600;
    }
    
    .profile-header p {
      margin: 0;
      opacity: 0.9;
      font-size: 16px;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 30px;
      text-align: center;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(38, 166, 154, 0.2);
      border-radius: 50%;
      border-top-color: #26a69a;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    
    .btn-spinner {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 30px;
      text-align: center;
      background-color: #fff8f8;
    }
    
    .error-icon {
      width: 48px;
      height: 48px;
      color: #f44336;
      margin-bottom: 15px;
    }
    
    .error-container p {
      margin: 0 0 20px 0;
      color: #d32f2f;
      font-size: 16px;
    }
    
    .retry-btn {
      padding: 10px 20px;
      background-color: #26a69a;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .retry-btn:hover {
      background-color: #00897b;
    }
    
    .profile-form {
      padding: 30px;
    }
    
    .user-avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
    
    .avatar-circle {
      width: 100px;
      height: 100px;
      background-color: #26a69a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: 600;
      color: white;
      text-transform: uppercase;
      box-shadow: 0 4px 10px rgba(38, 166, 154, 0.3);
    }
    
    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      font-weight: 500;
      margin-bottom: 8px;
      color: #455a64;
      font-size: 14px;
    }
    
    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 16px;
      transition: all 0.2s;
      background-color: #f9f9f9;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #26a69a;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.1);
    }
    
    .form-control.error {
      border-color: #f44336;
      background-color: #fff8f8;
    }
    
    .form-control:disabled {
      background-color: #f0f0f0;
      color: #757575;
      cursor: not-allowed;
      border-color: #e0e0e0;
    }
    
    .error-text {
      display: block;
      color: #f44336;
      font-size: 12px;
      margin-top: 5px;
    }
    
    .hint-text {
      display: block;
      color: #9e9e9e;
      font-size: 12px;
      margin-top: 5px;
      font-style: italic;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;
    }
    
    .cancel-btn {
      padding: 12px 24px;
      background-color: transparent;
      color: #455a64;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .cancel-btn:hover:not(:disabled) {
      background-color: #f5f5f5;
    }
    
    .cancel-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .save-btn {
      padding: 12px 24px;
      background-color: #26a69a;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      min-width: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .save-btn:hover:not(:disabled) {
      background-color: #00897b;
    }
    
    .save-btn:disabled {
      background-color: #b2dfdb;
      cursor: not-allowed;
    }
    
    .success-toast {
      position: fixed;
      bottom: 30px;
      right: 30px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px 20px;
      background-color: #2e7d32;
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
      z-index: 1000;
    }
    
    .success-toast svg {
      flex-shrink: 0;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-10px); }
    }
    
    @media (max-width: 768px) {
      .profile-header {
        padding: 20px;
      }
      
      .profile-form {
        padding: 20px;
      }
      
      .form-row {
        grid-template-columns: 1fr;
        gap: 10px;
      }
      
      .form-actions {
        flex-direction: column-reverse;
      }
      
      .save-btn, .cancel-btn {
        width: 100%;
      }
    }
  `]
})
export class UserProfileComponent implements OnInit {
  originalProfile: UserDto | null = null;
  userProfile: UserDto = {
    email: '',
    phone: '',
    firstName: '',
    middleName: '',
    lastName: '',
    doctorAvailabilities: []  
  };
  
  loading = false;
  error: string | null = null;
  saving = false;
  saveSuccess = false;
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.loadUserProfile();
  }
  
  loadUserProfile(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
        // Keep a copy of the original data
        this.originalProfile = {...data};
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
        this.error = 'Failed to load your profile. Please try again.';
        this.loading = false;
      }
    });
  }
  
  saveProfile(): void {
    this.saving = true;
    this.saveSuccess = false;
    
    this.userService.updateUserProfile(this.userProfile).subscribe({
      next: (updatedProfile) => {
        this.userProfile = updatedProfile;
        this.originalProfile = {...updatedProfile};
        this.saving = false;
        this.saveSuccess = true;
        
        setTimeout(() => {
          this.saveSuccess = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.error = 'Failed to update your profile. Please try again.';
        this.saving = false;
      }
    });
  }
  
  resetChanges(): void {
    if (this.originalProfile) {
      this.userProfile = {...this.originalProfile};
    }
  }
  
  getUserInitials(): string {
    const firstName = this.userProfile.firstName || '';
    const lastName = this.userProfile.lastName || '';
    
    if (!firstName && !lastName) return '';
    
    return (
      (firstName.charAt(0) || '') + 
      (lastName.charAt(0) || '')
    ).toUpperCase();
  }
}