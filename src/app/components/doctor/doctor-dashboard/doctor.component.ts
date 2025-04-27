// src/app/components/doctor/doctor-dashboard/doctor-dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { DoctorNotificationComponent } from '../../doctor-notification/doctor-notification.component';
import { DoctorNotificationService } from '../../doctor-notification/doctor-notification.service';
import { AppointmentListComponent } from "../../appointment-form/appointment-list.component";

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorNotificationComponent, AppointmentListComponent],
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

      <button class="nav-item" (click)="navigateToAppointments()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"/>
        </svg>
        <span>Appointments</span>
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
      <div class="dashboard-card availability">
        <h2>My Availability</h2>

        <!-- Date Picker Section -->
        <div class="date-picker-section">
          <div class="date-input-container">
            <label for="selected-date">Select Date:</label>
            <input
              type="date"
              id="selected-date"
              class="date-input"
              [(ngModel)]="selectedDate"
              [min]="getMinDate()"
              (change)="onDateChange()"
            >
          </div>
          <p class="selected-date-display" *ngIf="selectedDate">
            Selected: {{ formatSelectedDate() }}
          </p>
        </div>

        <!-- Time slots section -->
        <div class="time-slots">
          <div class="time-slot" *ngFor="let slot of currentDateSlots; let i = index">
            <div class="time-range">
              <input type="time" [(ngModel)]="currentDateSlots[i].startTime" class="time-input">
              <span>to</span>
              <input type="time" [(ngModel)]="currentDateSlots[i].endTime" class="time-input">
            </div>
            <button class="remove-slot-btn" *ngIf="currentDateSlots.length > 1" (click)="removeTimeSlot(i)">✕</button>
          </div>
          <button class="add-slot-btn" (click)="addTimeSlot()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Add Time Slot
          </button>
        </div>
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

    /* Availability Card */
    .date-picker-section {
      margin-bottom: 16px;
      padding: 12px;
      background-color: #f9f9f9;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
    }

    .date-input-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .date-input-container label {
      font-weight: 500;
      color: #333;
      min-width: 100px;
    }

    .date-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
    }

    .selected-date-display {
      margin-top: 10px;
      font-size: 14px;
      color: #01579b;
      font-weight: 500;
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

      .date-input-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }
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

    .success-toast {
      background-color: #4caf50;
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
  `]
})
export class DoctorDashboardComponent implements OnInit, OnDestroy {
  doctorInfo: any = null;
  photoPreview: string | null = null;
  private subscriptions: Subscription = new Subscription();

  // Selected date and its time slots
  selectedDate: string = '';
  currentDateSlots: Array<{ startTime: string, endTime: string }> = [];

  // Store availability for different dates (key: date in YYYY-MM-DD format, value: time slots)
  datesAvailability: { [date: string]: Array<{ startTime: string, endTime: string }> } = {};

  doctorDto: any = {
    doctorId: 0,
    firstName: '',
    lastName: '',
    expertise: ''
  };

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router,
    private notificationService: DoctorNotificationService
  ) {}

  ngOnInit(): void {
    this.loadDoctorProfile();

    // Initialize selected date as today's date
    const today = new Date();
    this.selectedDate = this.formatDateForInput(today);
    this.onDateChange();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  navigateToAppointments(): void {
    this.router.navigate(['/get/all/appointment']);
  }

  getInitials(): string {
    if (!this.doctorInfo) return '';

    const firstName = this.doctorInfo.firstName || '';
    const lastName = this.doctorInfo.lastName || '';

    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  // Format date for date input (YYYY-MM-DD)
  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Get minimum date for date picker (today)
  getMinDate(): string {
    return this.formatDateForInput(new Date());
  }

  // Format selected date for display
  formatSelectedDate(): string {
    if (!this.selectedDate) return '';

    const date = new Date(this.selectedDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Handle date change
  onDateChange(): void {
    if (!this.selectedDate) return;

    // Check if we already have slots for this date
    if (!this.datesAvailability[this.selectedDate]) {
      // Initialize with default slot
      this.datesAvailability[this.selectedDate] = [
        { startTime: '09:00', endTime: '17:00' }
      ];
    }

    // Update current date slots reference
    this.currentDateSlots = this.datesAvailability[this.selectedDate];
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
          expertise: data.expertise || ''
        };

        // Load dates availability if there is any
        if (data.datesAvailability) {
          this.datesAvailability = data.datesAvailability;

          // Initialize current date slots if there's a selected date
          if (this.selectedDate && this.datesAvailability[this.selectedDate]) {
            this.currentDateSlots = this.datesAvailability[this.selectedDate];
          }
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

  addTimeSlot(): void {
    const newSlot = { startTime: '09:00', endTime: '17:00' };
    this.currentDateSlots.push(newSlot);
  }

  removeTimeSlot(index: number): void {
    this.currentDateSlots.splice(index, 1);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  saveChanges(): void {
    const doctorData = {
      ...this.doctorDto,
      selectedDate: this.selectedDate,
      timeSlots: this.currentDateSlots
    };

    this.doctorService.updateDoctorProfile(doctorData).subscribe({
      next: (response) => {
        // Check if the response has the expected structure
        if (response && response.message) {
          // Use the message from the backend response
          this.showToast(response.message, 'success');
        } else if (response && response.data && response.data.message) {
          // Try alternative structure if the message is nested in data
          this.showToast(response.data.message, 'success');
        } else {
          // Fallback if the response structure is unexpected
          this.showToast('Profile updated successfully', 'success');
        }

        // Handle the data from the response
        const updatedData = response.data || response;

        // Update local data if there are time slots returned
        if (updatedData.timeSlots && this.selectedDate) {
          this.datesAvailability[this.selectedDate] = updatedData.timeSlots;
          this.currentDateSlots = [...this.datesAvailability[this.selectedDate]];
        }

        // Debug log to check what's being received
        console.log('Update response:', response);
      },
      error: (error) => {
        console.error('Error updating doctor profile:', error);
        this.showToast('Failed to update profile. Please try again.', 'error');
      }
    });
  }

  // Replace your showToast method with this one
private showToast(message: string, type: 'success' | 'error'): void {
  // Remove any existing toasts
  const existingToasts = document.querySelectorAll('.toast-container');
  existingToasts.forEach(toast => toast.remove());

  // Create container
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  toastContainer.style.position = 'fixed';
  toastContainer.style.bottom = '30px';
  toastContainer.style.right = '30px';
  toastContainer.style.zIndex = '9999';

  // Create toast element with inline styles (to avoid CSS issues)
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
  toast.style.color = 'white';
  toast.style.padding = '15px 20px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.minWidth = '200px';

  toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);

  console.log(`Showing ${type} toast with message: ${message}`);
    setTimeout(() => {
    if (document.body.contains(toastContainer)) {
      document.body.removeChild(toastContainer);
    }
  }, 3000);
}

}
