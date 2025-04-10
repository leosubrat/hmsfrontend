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
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Doctor Dashboard</h1>
      <div class="header-actions">
        <app-doctor-notification [doctorId]="doctorDto.doctorId"></app-doctor-notification>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="profile-card">
        <h2>My Profile</h2>
        <div class="profile-info">
          <div class="doctor-details">
            <div class="profile-photo-container">
              <div class="photo-preview" [ngStyle]="{'background-image': photoPreview ? 'url(' + photoPreview + ')' : 'none'}">
                <span *ngIf="!photoPreview">No Photo</span>
              </div>
              <div class="photo-upload">
                <label for="photo-upload" class="upload-btn">Upload Photo</label>
                <input type="file" id="photo-upload" accept="image/*" (change)="onPhotoSelected($event)" hidden>
              </div>
            </div>
            <div class="details-text">
              <h3>Dr. {{ doctorInfo?.firstName }} {{ doctorInfo?.lastName }}</h3>
              <p class="specialization">{{ doctorInfo?.expertise }}</p>
              <p>Experience: {{ doctorInfo?.experience }} years</p>
            </div>
          </div>
        </div>
      </div>

      <div class="update-section">
        <h2>Update Your Professional Description</h2>
        
        <div class="form-group">
          <label for="description">Professional Description</label>
          <textarea 
            id="description" 
            rows="6" 
            [(ngModel)]="doctorDto.description" 
            placeholder="Describe your expertise, education, and approach to patient care..."
          ></textarea>
          <p class="field-info">This description will be visible to patients on your profile</p>
        </div>
        
        <h2>Set Your Availability</h2>
        
        <div class="availability-container">
          <div class="availability-day">
            <h3>Today's Availability</h3>
            <div class="time-slots">
              <div class="time-slot" *ngFor="let slot of todaySlots; let i = index">
                <div class="time-range">
                  <input type="time" [(ngModel)]="todaySlots[i].startTime" class="time-input">
                  <span>to</span>
                  <input type="time" [(ngModel)]="todaySlots[i].endTime" class="time-input">
                </div>
                <button class="remove-slot-btn" *ngIf="todaySlots.length > 1" (click)="removeTimeSlot('today', i)">✕</button>
              </div>
              <button class="add-slot-btn" (click)="addTimeSlot('today')">+ Add Time Slot</button>
            </div>
          </div>
          
          <div class="availability-day">
            <h3>Tomorrow's Availability</h3>
            <div class="time-slots">
              <div class="time-slot" *ngFor="let slot of tomorrowSlots; let i = index">
                <div class="time-range">
                  <input type="time" [(ngModel)]="tomorrowSlots[i].startTime" class="time-input">
                  <span>to</span>
                  <input type="time" [(ngModel)]="tomorrowSlots[i].endTime" class="time-input">
                </div>
                <button class="remove-slot-btn" *ngIf="tomorrowSlots.length > 1" (click)="removeTimeSlot('tomorrow', i)">✕</button>
              </div>
              <button class="add-slot-btn" (click)="addTimeSlot('tomorrow')">+ Add Time Slot</button>
            </div>
          </div>
        </div>
        
        <button class="save-btn" (click)="saveChanges()">Save Changes</button>
      </div>
    </div>
  </div>
`,
 
styles: [`
  .dashboard-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .dashboard-header h1 {
    color: #01579b;
    margin: 0;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .logout-btn {
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .profile-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 30px;
  }
  
  .profile-card h2 {
    color: #01579b;
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }
  
  .profile-info {
    display: flex;
    width: 100%;
  }

  .doctor-details {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .details-text {
    flex: 1;
  }
  
  .doctor-details h3 {
    margin: 0 0 10px 0;
    color: #01579b;
  }
  
  .specialization {
    color: #4db6ac;
    font-weight: 500;
    margin-bottom: 5px;
    text-transform: capitalize;
  }

  .profile-photo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .photo-preview {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }

  .photo-upload {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .upload-btn {
    padding: 6px 12px;
    background-color: #4db6ac;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
  }

  .upload-btn:hover {
    background-color: #00897b;
  }
  
  .update-section {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .update-section h2 {
    color: #01579b;
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #455a64;
  }
  
  .field-info {
    margin-top: 5px;
    font-size: 0.85rem;
    color: #757575;
    font-style: italic;
  }
  
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  textarea:focus {
    outline: none;
    border-color: #4db6ac;
    box-shadow: 0 0 0 2px rgba(77, 182, 172, 0.2);
  }
  
  .availability-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .availability-day {
    flex: 1;
    min-width: 250px;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 15px;
  }
  
  .availability-day h3 {
    color: #01579b;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.1rem;
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
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .remove-slot-btn {
    background: none;
    border: none;
    color: #f44336;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
  }
  
  .add-slot-btn {
    margin-top: 10px;
    padding: 8px;
    background-color: transparent;
    color: #4db6ac;
    border: 1px dashed #4db6ac;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .add-slot-btn:hover {
    background-color: rgba(77, 182, 172, 0.1);
  }
  
  .save-btn {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #4db6ac;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 30px;
    transition: background-color 0.3s ease;
  }
  
  .save-btn:hover {
    background-color: #00897b;
  }
  
  @media (max-width: 768px) {
    .dashboard-container {
      padding: 15px;
    }
    
    .availability-container {
      flex-direction: column;
    }

    .doctor-details {
      flex-direction: column;
      align-items: center;
      text-align: center;
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
        alert('Your profile, photo, and availability have been successfully updated!');
      },
      error: (error) => {
        console.error('Error updating doctor information:', error);
        alert('There was an error updating your information. Please try again.');
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