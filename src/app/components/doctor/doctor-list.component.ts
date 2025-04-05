// src/app/components/user/doctor/doctor-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DoctorDto } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { environments } from '../../../environments/environment';


@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="doctor-list-container">
      <h2>Available Doctors</h2>
      
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <p>{{ error }}</p>
        <button (click)="loadDoctors()" class="retry-button">Retry</button>
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
          <div class="doctor-image">
            <img [src]="getDoctorPhotoUrl(doctor)" [alt]="getFullName(doctor)">
          </div>
          <div class="doctor-info">
            <h3>{{ getFullName(doctor) }}</h3>
            <p class="specialization">{{ doctor.expertise }}</p>
            <p class="experience" *ngIf="doctor.experience">
              <span class="experience-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </span>
              {{ doctor.experience }} years experience
            </p>
            <div class="description" *ngIf="doctor.description">
              <p>Description:{{ doctor.description }}</p>
            </div>
            <button class="book-appointment-btn" (click)="bookAppointment(doctor)">Book Appointment</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .doctor-list-container {
      padding: 24px;
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      color: #0d2437;
      margin-bottom: 20px;
      font-weight: 600;
      border-bottom: 2px solid #4db6ac;
      padding-bottom: 10px;
    }
    
    .loading-state,
    .error-state,
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
    }
    
    .spinner {
      animation: rotate 2s linear infinite;
      width: 50px;
      height: 50px;
      margin-bottom: 20px;
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
      margin-bottom: 15px;
      color: #f44336;
      font-size: 48px;
    }
    
    .empty-icon {
      color: #9e9e9e;
    }
    
    .retry-button {
      margin-top: 15px;
      padding: 8px 16px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .retry-button:hover {
      background-color: #00897b;
    }
    
    .doctors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .doctor-card {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .doctor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    .doctor-image {
      position: relative;
      height: 180px;
      overflow: hidden;
      background-color: #f0f0f0;
    }
    
    .doctor-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    
    .doctor-card:hover .doctor-image img {
      transform: scale(1.05);
    }
    
    .doctor-info {
      padding: 15px;
    }
    
    .doctor-info h3 {
      margin: 0 0 8px 0;
      color: #0d2437;
      font-size: 18px;
    }
    
    .specialization {
      color: #4db6ac;
      font-weight: 500;
      margin-bottom: 8px;
      text-transform: capitalize;
    }
    
    .experience {
      display: flex;
      align-items: center;
      color: #616161;
      margin-bottom: 12px;
      font-size: 14px;
    }
    
    .experience-icon {
      margin-right: 6px;
      display: inline-flex;
    }
    
    .description {
      margin: 12px 0;
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      max-height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    
    .book-appointment-btn {
      width: 100%;
      padding: 10px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .book-appointment-btn:hover {
      background-color: #00897b;
    }
    
    @media (max-width: 768px) {
      .doctors-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DoctorListComponent implements OnInit {
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
  
  /**
   * Get the full name of the doctor
   */
  getFullName(doctor: DoctorDto): string {
    if (doctor.middleName) {
      return `Dr. ${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`;
    }
    return `Dr. ${doctor.firstName} ${doctor.lastName}`;
  }
  
  /**
   * Get the doctor's photo URL
   * If no photo is available, return a default image
   */
  getDoctorPhotoUrl(doctor: DoctorDto): string {
    if (doctor.photo) {
      // Check if the photo path is a full URL or a relative path
      if (doctor.photo.startsWith('http')) {
        return doctor.photo;
      } else {
        // Assuming the path stored in the database is relative to a known location
        return `${this.baseUrl}/images/doctors/${doctor.photo}`;
      }
    }
    return 'assets/images/default-doctor.png';
  }
  
  /**
   * Book an appointment with the selected doctor
   */
  bookAppointment(doctor: DoctorDto): void {
    console.log('Booking appointment with doctor:', doctor);

  }
}