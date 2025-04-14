// src/app/components/user/doctor/doctor-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DoctorDto } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { environments } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AppointmentFormComponent],
  template: `
    <div class="doctor-list-container">
      <div class="doctor-list-header">
        <h2>Find a Specialist</h2>
        <p class="subtitle">Book an appointment with one of our top specialists</p>
      </div>
      
      <!-- Loading state -->
      <div class="loading-state" *ngIf="isLoading">
        <div class="spinner">
          <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
        </div>
        <p>Loading doctors...</p>
      </div>
      
      <!-- Error state -->
      <div class="error-state" *ngIf="error">
        <div class="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <p>{{ error }}</p>
        <button (click)="loadDoctors()" class="retry-button">Try Again</button>
      </div>
      
      <!-- Empty state -->
      <div class="empty-state" *ngIf="!isLoading && !error && doctors.length === 0">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            <path d="M12 15c1.93 0 3.5-1.57 3.5-3.5S13.93 8 12 8s-3.5 1.57-3.5 3.5S10.07 15 12 15zM7 18h10v-1.5c0-1.66-3.34-2.5-5-2.5s-5 .84-5 2.5V18z"/>
          </svg>
        </div>
        <p>No doctors available at the moment.</p>
      </div>
      
      <!-- Doctor list -->
      <div class="doctors-grid" *ngIf="!isLoading && !error && doctors.length > 0">
        <div class="doctor-card" *ngFor="let doctor of doctors">
          <div class="doctor-card-inner">
            <div class="doctor-avatar">
              <div class="avatar-circle">
                <span>{{ getInitials(doctor) }}</span>
              </div>
            </div>
            <div class="doctor-info">
              <h3>{{ getFullName(doctor) }}</h3>
              <div class="specialty-badge">{{ doctor.expertise }}</div>
              
              <div class="details-row">
                <div class="detail-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <span>{{ doctor.experience }} years experience</span>
                </div>
                
                <div class="detail-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                  </svg>
                  <span>Top Rated</span>
                </div>
              </div>

              <!-- License Number -->
              <div class="license-number">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm0 16H2V5h20v14zM21 6h-7v5h7V6zm-1 2h-5v1h5V8zm0-1h-5v1h5V7zM8 12.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM5 17h11c0-1.5-1.6-3-4-3h-3c-2.4 0-4 1.5-4 3z"/>
                </svg>
                <span>License: {{ doctor.licenseNumber }}</span>
              </div>
              
              <div class="description" *ngIf="doctor.description">
                <p>{{ truncateDescription(doctor.description, 120) }}</p>
              </div>
              
              <button class="book-appointment-btn" (click)="bookAppointment(doctor)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"/>
                </svg>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <app-appointment-form 
        *ngIf="selectedDoctor"
        [doctorId]="selectedDoctor.id"
        [doctorName]="selectedDoctor.name"
        [doctorSpecialty]="selectedDoctor.specialty"
        (closeModal)="closeAppointmentForm()"
      ></app-appointment-form>
    </div>
  `,
  styles: [`
    .doctor-list-container {
      padding: 30px;
      background-color: #f8f9fa;
      border-radius: 12px;
      box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
    }
    
    .doctor-list-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    h2 {
      color: #0d2437;
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 28px;
    }
    
    .subtitle {
      color: #757575;
      font-size: 16px;
    }
    
    .loading-state,
    .error-state,
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 40px;
      text-align: center;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    }
    
    .spinner {
      animation: rotate 2s linear infinite;
      width: 60px;
      height: 60px;
      margin-bottom: 24px;
    }
    
    .spinner .path {
      stroke: #4db6ac;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
    
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
    
    .error-icon,
    .empty-icon {
      margin-bottom: 20px;
      color: #f44336;
      font-size: 48px;
    }
    
    .empty-icon {
      color: #9e9e9e;
    }
    
    .error-state p,
    .empty-state p {
      font-size: 16px;
      margin-bottom: 20px;
      color: #757575;
    }
    
    .retry-button {
      margin-top: 15px;
      padding: 12px 24px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    
    .retry-button:hover {
      background-color: #00897b;
    }
    
    .doctors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
      margin-top: 20px;
    }
    
    .doctor-card {
      background-color: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .doctor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }
    
    .doctor-card-inner {
      padding: 24px;
    }
    
    .doctor-avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .avatar-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4db6ac 0%, #26a69a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 36px;
      font-weight: 600;
      box-shadow: 0 8px 16px rgba(77, 182, 172, 0.3);
    }
    
    .doctor-info {
      text-align: center;
    }
    
    .doctor-info h3 {
      margin: 0 0 12px 0;
      color: #0d2437;
      font-size: 20px;
      font-weight: 600;
    }
    
    .specialty-badge {
      display: inline-block;
      padding: 6px 12px;
      background-color: #e3f2fd;
      color: #1976d2;
      border-radius: 20px;
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 16px;
      text-transform: capitalize;
    }
    
    .details-row {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #616161;
      font-size: 14px;
    }
    
    .detail-item svg {
      opacity: 0.7;
    }
    
    /* License Number Styles */
    .license-number {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: #616161;
      font-size: 14px;
      margin-bottom: 16px;
      padding: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    
    .license-number svg {
      opacity: 0.7;
    }
    
    .description {
      margin: 16px 0;
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      text-align: left;
      padding: 16px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    
    .description p {
      margin: 0;
    }
    
    .availability {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 20px;
      color: #43a047;
      font-weight: 500;
    }
    
    .availability-icon {
      display: flex;
    }
    
    .book-appointment-btn {
      width: 100%;
      padding: 14px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
    }
    
    .book-appointment-btn:hover {
      background-color: #00897b;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(77, 182, 172, 0.4);
    }
    
    @media (max-width: 768px) {
      .doctors-grid {
        grid-template-columns: 1fr;
      }
      
      .doctor-list-container {
        padding: 20px;
      }
      
      .doctor-card-inner {
        padding: 20px;
      }
    }
  `]
})
export class DoctorListComponent implements OnInit {
  selectedDoctor: any = null;

  doctors: DoctorDto[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  private baseUrl = environments.apiUrl;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.isLoading = true;
    this.error = null;
    
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.error = 'Failed to load doctors. Please try again later.';
        this.isLoading = false;
      }
    });
  }
  
  getFullName(doctor: DoctorDto): string {
    if (doctor.middleName) {
      return `Dr. ${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`;
    }
    return `Dr. ${doctor.firstName} ${doctor.lastName}`;
  }
  
  getInitials(doctor: DoctorDto): string {
    return (doctor.firstName.charAt(0) + doctor.lastName.charAt(0)).toUpperCase();
  }
  
  truncateDescription(description: string, maxLength: number): string {
    if (!description) return '';
    
    if (description.length <= maxLength) {
      return description;
    }
    
    return description.substring(0, maxLength) + '...';
  }

  bookAppointment(doctor: DoctorDto): void {
    this.selectedDoctor = {
      id: doctor.doctorId,
      name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
      specialty: doctor.expertise
    };
  }
  
  closeAppointmentForm(): void {
    this.selectedDoctor = null;
  }
}