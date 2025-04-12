// src/app/components/doctor/doctor-dashboard/doctor-dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { DoctorNotificationComponent } from '../../doctor-notification/doctor-notification.component';
import { DoctorNotificationService } from '../../doctor-notification/doctor-notification.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorNotificationComponent],
  template: `
  <div class="dashboard-wrapper">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="doctor-profile">
          <div class="doctor-avatar" [ngStyle]="{'background-image': photoPreview ? 'url(' + photoPreview + ')' : 'none'}">
            <span *ngIf="!photoPreview">{{ getInitials() }}</span>
          </div>
          <div class="doctor-info">
            <h3>Dr. {{ doctorInfo?.firstName }} {{ doctorInfo?.lastName }}</h3>
            <p>{{ doctorInfo?.expertise }}</p>
          </div>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <button class="nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          <span>Dashboard</span>
        </button>
        
        <button class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"/>
          </svg>
          <span>Appointments</span>
        </button>
        
        <button class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span>My Profile</span>
        </button>
        
        <button class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
          <span>Settings</span>
        </button>
        
        <button class="nav-item logout" (click)="logout()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
    
    <main class="main-content">
      <header class="main-header">
        <h1>Doctor Dashboard</h1>
        <div class="header-actions">
          <app-doctor-notification [doctorId]="doctorDto.doctorId"></app-doctor-notification>
        </div>
      </header>
      
      <div class="dashboard-grid">
        <div class="dashboard-card summary-stats">
          <h2>Summary</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">12</div>
              <div class="stat-label">Appointments Today</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">45</div>
              <div class="stat-label">Total Patients</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">4.8</div>
              <div class="stat-label">Rating</div>
            </div>
          </div>
        </div>
        
        <div class="dashboard-card profile-form">
          <h2>Professional Profile</h2>
          <div class="form-group">
            <label for="description">Professional Description</label>
            <textarea 
              id="description" 
              rows="4" 
              [(ngModel)]="doctorDto.description" 
              placeholder="Describe your expertise, education, and approach to patient care..."
            ></textarea>
            <p class="field-info">This description will be visible to patients on your profile</p>
          </div>
          
          <div class="photo-upload-section">
            <div class="photo-preview" [ngStyle]="{'background-image': photoPreview ? 'url(' + photoPreview + ')' : 'none'}">
              <span *ngIf="!photoPreview">No Photo</span>
            </div>
            <div class="photo-upload-controls">
              <label for="photo-upload" class="upload-btn">Change Profile Photo</label>
              <input type="file" id="photo-upload" accept="image/*" (change)="onPhotoSelected($event)" hidden>
              <p class="field-info">Recommended: Square image, at least 300x300 pixels</p>
            </div>
          </div>
        </div>
        
        <div class="dashboard-card availability">
          <h2>My Availability</h2>
          
          <div class="availability-tabs">
            <button class="tab active">Today</button>
            <button class="tab">Tomorrow</button>
            <button class="tab">Custom Date</button>
          </div>
          
          <div class="time-slots">
            <div class="time-slot" *ngFor="let slot of todaySlots; let i = index">
              <div class="time-range">
                <input type="time" [(ngModel)]="todaySlots[i].startTime" class="time-input">
                <span>to</span>
                <input type="time" [(ngModel)]="todaySlots[i].endTime" class="time-input">
              </div>
              <button class="remove-slot-btn" *ngIf="todaySlots.length > 1" (click)="removeTimeSlot('today', i)">✕</button>
            </div>
            <button class="add-slot-btn" (click)="addTimeSlot('today')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add Time Slot
            </button>
          </div>
        </div>
        
        <div class="dashboard-card appointments">
          <h2>Upcoming Appointments</h2>
          
          <div class="appointment-list">
            <div class="appointment-item">
              <div class="appointment-time">
                <div class="time">09:00 AM</div>
                <div class="date">Today</div>
              </div>
              <div class="appointment-details">
                <div class="patient-name">John Smith</div>
                <div class="appointment-type">General Checkup</div>
              </div>
              <div class="appointment-actions">
                <button class="action-btn view">View</button>
              </div>
            </div>
            
            <div class="appointment-item">
              <div class="appointment-time">
                <div class="time">11:30 AM</div>
                <div class="date">Today</div>
              </div>
              <div class="appointment-details">
                <div class="patient-name">Sarah Johnson</div>
                <div class="appointment-type">Follow-up</div>
              </div>
              <div class="appointment-actions">
                <button class="action-btn view">View</button>
              </div>
            </div>
            
            <div class="appointment-item">
              <div class="appointment-time">
                <div class="time">02:15 PM</div>
                <div class="date">Tomorrow</div>
              </div>
              <div class="appointment-details">
                <div class="patient-name">Michael Brown</div>
                <div class="appointment-type">Consultation</div>
              </div>
              <div class="appointment-actions">
                <button class="action-btn view">View</button>
              </div>
            </div>
          </div>
          
          <button class="view-all-btn">View All Appointments</button>
        </div>
      </div>
      
      <div class="action-footer">
        <button class="save-btn" (click)="saveChanges()">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
          </svg>
          Save Changes
        </button>
      </div>
    </main>
  </div>
  `,
  styles: [`
    /* Modern Dashboard Layout */
    .dashboard-wrapper {
      display: flex;
      min-height: 100vh;
      background-color: #f5f8fa;
    }
    
    /* Sidebar */
    .sidebar {
      width: 260px;
      background-color: #fff;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    }
    
    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .doctor-profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .doctor-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #4db6ac;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
      background-size: cover;
      background-position: center;
    }
    
    .doctor-info h3 {
      margin: 0;
      font-size: 16px;
      color: #333;
    }
    
    .doctor-info p {
      margin: 4px 0 0 0;
      font-size: 14px;
      color: #4db6ac;
    }
    
    .sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px 0;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      gap: 12px;
      border: none;
      background: transparent;
      cursor: pointer;
      color: #666;
      text-align: left;
      transition: all 0.2s;
    }
    
    .nav-item:hover {
      background-color: #f5f8fa;
      color: #01579b;
    }
    
    .nav-item.active {
      background-color: #e3f2fd;
      color: #01579b;
      font-weight: 500;
    }
    
    .nav-item svg {
      width: 20px;
      height: 20px;
      opacity: 0.8;
    }
    
    .nav-item.active svg {
      opacity: 1;
    }
    
    .nav-item.logout {
      margin-top: auto;
      border-top: 1px solid #f0f0f0;
      color: #e53935;
    }
    
    .nav-item.logout:hover {
      background-color: #ffebee;
    }
    
    /* Main Content */
    .main-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
    
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    
    .main-header h1 {
      color: #333;
      font-size: 24px;
      margin: 0;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    /* Dashboard Grid */
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .dashboard-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 20px;
    }
    
    .dashboard-card h2 {
      color: #333;
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f0f0f0;
    }
    
    /* Summary Stats Card */
    .summary-stats {
      grid-column: span 2;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    
    .stat-item {
      text-align: center;
      padding: 16px;
      background-color: #f9f9f9;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .stat-item:hover {
      background-color: #e3f2fd;
      transform: translateY(-3px);
    }
    
    .stat-value {
      font-size: 28px;
      font-weight: 600;
      color: #01579b;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 14px;
      color: #666;
    }
    
    /* Profile Form Card */
    .profile-form {
      grid-column: span 2;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    
    textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      resize: vertical;
      font-family: inherit;
      font-size: 14px;
      line-height: 1.5;
      transition: all 0.2s;
    }
    
    textarea:focus {
      outline: none;
      border-color: #4db6ac;
      box-shadow: 0 0 0 2px rgba(77, 182, 172, 0.1);
    }
    
    .field-info {
      margin-top: 6px;
      font-size: 13px;
      color: #757575;
      font-style: italic;
    }
    
    .photo-upload-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .photo-preview {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e0e0e0;
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }
    
    .photo-upload-controls {
      flex: 1;
    }
    
    .upload-btn {
      display: inline-block;
      padding: 10px 16px;
      background-color: #4db6ac;
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    
    .upload-btn:hover {
      background-color: #00897b;
    }
    
    /* Availability Card */
    .availability-tabs {
      display: flex;
      margin-bottom: 16px;
      background-color: #f5f5f5;
      border-radius: 6px;
      padding: 4px;
    }
    
    .tab {
      flex: 1;
      padding: 10px;
      text-align: center;
      background: transparent;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    
    .tab.active {
      background-color: white;
      color: #01579b;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .time-slots {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .time-slot {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .time-range {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }
    
    .time-input {
      padding: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      flex: 1;
    }
    
    .remove-slot-btn {
      background: none;
      border: none;
      color: #f44336;
      cursor: pointer;
      font-size: 18px;
      padding: 5px;
    }
    
    .add-slot-btn {
      margin-top: 10px;
      padding: 10px;
      background-color: transparent;
      color: #4db6ac;
      border: 1px dashed #4db6ac;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .add-slot-btn:hover {
      background-color: rgba(77, 182, 172, 0.1);
    }
    
    /* Appointments Card */
    .appointment-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .appointment-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 6px;
      background-color: #f9f9f9;
      transition: all 0.2s;
    }
    
    .appointment-item:hover {
      background-color: #f0f0f0;
    }
    
    .appointment-time {
      width: 100px;
      padding-right: 16px;
      border-right: 1px solid #e0e0e0;
    }
    
    .time {
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }
    
    .date {
      color: #666;
      font-size: 12px;
      margin-top: 4px;
    }
    
    .appointment-details {
      flex: 1;
      padding: 0 16px;
    }
    
    .patient-name {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }
    
    .appointment-type {
      color: #666;
      font-size: 12px;
      margin-top: 4px;
    }
    
    .appointment-actions {
      display: flex;
      gap: 8px;
    }
    
    .action-btn {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .action-btn.view {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    .action-btn.view:hover {
      background-color: #bbdefb;
    }
    
    .view-all-btn {
      display: block;
      width: 100%;
      padding: 10px;
      margin-top: 16px;
      background-color: transparent;
      color: #4db6ac;
      border: 1px solid #4db6ac;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .view-all-btn:hover {
      background-color: rgba(77, 182, 172, 0.1);
    }
    
    /* Action Footer */
    .action-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    
    .save-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .save-btn:hover {
      background-color: #00897b;
    }
    
    /* Responsive Styles */
    @media (max-width: 1200px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
      
      .summary-stats {
        grid-column: span 1;
      }
      
      .profile-form {
        grid-column: span 1;
      }
    }
    
    @media (max-width: 992px) {
      .dashboard-wrapper {
        flex-direction: column;
      }
      
      .sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #e0e0e0;
      }
      
      .sidebar-nav {
        flex-direction: row;
        overflow-x: auto;
        padding: 10px;
      }
      
      .nav-item {
        flex-direction: column;
        padding: 10px;
        gap: 5px;
      }
      
      .nav-item.logout {
        margin-top: 0;
        border-top: none;
      }
      
      .photo-upload-section {
        flex-direction: column;
        align-items: flex-start;
      }
      .success-toast, .error-toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
  }
  .error-toast {
    background-color: #f44336;
    color: white;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
  .success-toast {
    background-color: #4caf50;
    color: white;
  }
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DoctorDashboardComponent implements OnInit, OnDestroy {
  doctorInfo: any = null;
  photoPreview: string | null = null;
  photoFile: File | null = null;
  private subscriptions: Subscription = new Subscription();

  doctorDto: any = {
    doctorId: 0,
    firstName: '',
    lastName: '',
    middleName: '',
    experience: 0,
    expertise: '',
    salary: '',
    description: ''
  };
  
  todaySlots: Array<{ startTime: string, endTime: string }> = [
    { startTime: '09:00', endTime: '12:00' }
  ];
  
  tomorrowSlots: Array<{ startTime: string, endTime: string }> = [
    { startTime: '09:00', endTime: '12:00' }
  ];
  
  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router,
    private notificationService: DoctorNotificationService
  ) {}
  
  ngOnInit(): void {
    this.loadDoctorProfile();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  getInitials(): string {
    if (!this.doctorInfo) return '';
    
    const firstName = this.doctorInfo.firstName || '';
    const lastName = this.doctorInfo.lastName || '';
    
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }
  
  loadDoctorProfile(): void {
    this.doctorService.getDoctorProfile().subscribe({
      next: (data) => {
        this.doctorInfo = data;
        
        // Set the doctorDto values from the profile data
        this.doctorDto = {
          doctorId: data.doctorId || 0,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          middleName: data.middleName || '',
          expertise: data.expertise || '',
          experience: data.experience || 0,
          salary: data.salary || '',
          description: data.description || ''
        };
        
        // Load availability if there is any
        if (data.todayAvailability && data.todayAvailability.length > 0) {
          this.todaySlots = data.todayAvailability;
        }
        
        if (data.tomorrowAvailability && data.tomorrowAvailability.length > 0) {
          this.tomorrowSlots = data.tomorrowAvailability;
        }
        
        // Load notifications after profile is loaded
        if (this.doctorDto.doctorId > 0) {
          this.loadNotifications();
        }
      },
      error: (error) => {
        console.error('Error loading doctor profile:', error);
      }
    });
  }
  
  loadNotifications(): void {
    if (this.doctorDto.doctorId <= 0) return;
    
    this.notificationService.getUnreadNotificationCount(this.doctorDto.doctorId).subscribe({
      error: (error) => {
        console.error('Error fetching notification count:', error);
      }
    });
  }
  
  addTimeSlot(day: string): void {
    const newSlot = { startTime: '09:00', endTime: '17:00' };
    
    if (day === 'today') {
      this.todaySlots.push(newSlot);
    } else {
      this.tomorrowSlots.push(newSlot);
    }
  }
  
  removeTimeSlot(day: string, index: number): void {
    if (day === 'today') {
      this.todaySlots.splice(index, 1);
    } else {
      this.tomorrowSlots.splice(index, 1);
    }
  }
  
  saveChanges(): void {
    // Create form data to send photo and other information
    const formData = new FormData();

    // Add doctor information as JSON string
    const doctorData = {
      ...this.doctorDto,
      todayAvailability: this.todaySlots,
      tomorrowAvailability: this.tomorrowSlots
    };
    
    if (this.photoFile) {
      formData.append('photo', this.photoFile);
    }
    
    formData.append('doctorData', JSON.stringify(doctorData));
    
    this.doctorService.updateDoctorProfileWithPhoto(doctorData, this.photoFile || undefined).subscribe({
      next: (response) => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-toast';
        successMessage.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
          <span>Your profile has been successfully updated!</span>
        `;
        document.body.appendChild(successMessage);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 3000);
      },
      error: (error) => {
        console.error('Error updating doctor information:', error);
        
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-toast';
        errorMessage.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>Failed to update your profile. Please try again.</span>
        `;
        document.body.appendChild(errorMessage);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
          document.body.removeChild(errorMessage);
        }, 3000);
      }
    });
  }
  
  onPhotoSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.photoFile = file;
      
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}