// src/app/components/doctors/doctors.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor/doctor.service';
import { DoctorDto } from '../../models/doctor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="doctors-container">
      <div class="container">
        <h1 class="section-title">Our Medical Specialists</h1>
        <p class="section-description">Find the right specialist for your healthcare needs</p>
        
        <div *ngIf="loading" class="loading-indicator">
          <div class="spinner"></div>
          <p>Loading doctors...</p>
        </div>
        
        <div *ngIf="!loading && doctors.length === 0" class="no-doctors">
          <p>No doctors available at the moment.</p>
        </div>
        
        <div class="doctors-grid" *ngIf="!loading && doctors.length > 0">
          <div class="doctor-card" *ngFor="let doctor of doctors">
            <div class="doctor-avatar">
              <div class="avatar-initials">
                {{ getInitials(doctor.firstName, doctor.lastName) }}
              </div>
            </div>
            <div class="doctor-info">
              <h3>Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h3>
              <p class="specialization">{{ doctor.expertise }}</p>
              <p class="experience">{{ doctor.experience }} years of experience</p>
              <button class="book-btn" (click)="navigateToLogin()">Book Appointment</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .doctors-container {
      padding: 3rem 0;
      background-color: #f5f8fa;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .section-title {
      font-size: 2rem;
      color: #01579b;
      text-align: center;
      margin-bottom: 0.5rem;
    }
    
    .section-description {
      text-align: center;
      color: #546e7a;
      margin-bottom: 2rem;
    }
    
    .doctors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .doctor-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    
    .doctor-card:hover {
      transform: translateY(-5px);
    }
    
    .doctor-avatar {
      height: 150px;
      background: linear-gradient(135deg, #1e88e5, #4db6ac);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .avatar-initials {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: white;
      color: #1e88e5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: bold;
    }
    
    .doctor-info {
      padding: 1.5rem;
    }
    
    .doctor-info h3 {
      margin: 0 0 0.5rem;
      color: #01579b;
    }
    
    .specialization {
      color: #4db6ac;
      font-weight: 500;
      margin-bottom: 0.5rem;
      text-transform: capitalize;
    }
    
    .experience {
      color: #546e7a;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .book-btn {
      width: 100%;
      padding: 0.8rem;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .book-btn:hover {
      background-color: #00897b;
    }
    
    .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(77, 182, 172, 0.1);
      border-left-color: #4db6ac;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .no-doctors {
      text-align: center;
      padding: 2rem;
      color: #546e7a;
    }
    
    @media (max-width: 768px) {
      .doctors-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorDto[] = [];
  loading: boolean = true;

  constructor(private doctorService: DoctorService,  private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.loading = false;
      }
    });
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }
  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}