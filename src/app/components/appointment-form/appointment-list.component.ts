// src/app/components/appointment/appointment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientAppointmentService } from '../../services/appointment/ patient-appointment.service';
import { PatientAppointmentDTO } from '../../models/patientAppointmentDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  template: `
    <div class="appointments-container">
      <h2>Your Appointments</h2>
      
      <div *ngIf="loading" class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading appointments...</p>
      </div>
      
      <div *ngIf="error" class="error-message">
        <p>{{ error }}</p>
        <button (click)="loadAppointments()">Try Again</button>
      </div>
      
      <div *ngIf="!loading && !error && appointments.length === 0" class="no-appointments">
        <p>You don't have any appointments yet.</p>
      </div>
      
      <div *ngIf="appointments.length > 0" class="appointments-list">
        <div *ngFor="let appointment of appointments" class="appointment-card">
          <div class="appointment-date">
            <div class="date">{{ formatDate(appointment.appointmentDate) }}</div>
            <div class="time">{{ appointment.appointmentTime }}</div>
          </div>
          
          <div class="appointment-details">
            <h3>{{ appointment.doctorName }}</h3>
            <p class="specialty">{{ appointment.doctorSpecialty }}</p>
            <p class="reason">{{ appointment.reasonForVisit }}</p>
            <p class="insurance">Insurance: {{ appointment.insurance }}</p>
            <p class="patient-type">{{ appointment.isNewPatient ? 'New Patient' : 'Returning Patient' }}</p>
          </div>
          
          <div class="appointment-actions">
            <button class="reschedule-btn">Reschedule</button>
            <button class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .appointments-container {
      padding: 20px;
    }
    
    .appointments-container h2 {
      color: #0d2437;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    
    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #4db6ac;
      animation: spin 1s linear infinite;
      margin-bottom: 15px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .error-message {
      text-align: center;
      padding: 20px;
      background-color: #ffebee;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .error-message p {
      color: #d32f2f;
      margin-bottom: 15px;
    }
    
    .error-message button {
      padding: 8px 16px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .no-appointments {
      text-align: center;
      padding: 40px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }
    
    .no-appointments p {
      margin-bottom: 15px;
      color: #757575;
    }
    
    .no-appointments button {
      padding: 10px 20px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .appointments-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .appointment-card {
      display: flex;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .appointment-date {
      background-color: #4db6ac;
      color: white;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 120px;
    }
    
    .date {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .time {
      font-size: 1rem;
    }
    
    .appointment-details {
      flex: 1;
      padding: 20px;
    }
    
    .appointment-details h3 {
      margin-top: 0;
      margin-bottom: 5px;
      color: #0d2437;
    }
    
    .specialty {
      color: #4db6ac;
      font-weight: 500;
      margin-bottom: 10px;
    }
    
    .reason {
      margin-bottom: 8px;
    }
    
    .insurance {
      font-size: 0.9rem;
      color: #757575;
      margin-bottom: 5px;
    }
    
    .patient-type {
      font-size: 0.9rem;
      color: #757575;
    }
    
    .appointment-actions {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      padding: 20px;
    }
    
    .reschedule-btn, .cancel-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .reschedule-btn {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    
    .cancel-btn {
      background-color: #ffebee;
      color: #d32f2f;
    }
    
    @media (max-width: 768px) {
      .appointment-card {
        flex-direction: column;
      }
      
      .appointment-date {
        width: 100%;
        padding: 15px;
        flex-direction: row;
        justify-content: space-between;
        min-width: unset;
      }
      
      .appointment-actions {
        flex-direction: row;
        padding: 15px;
      }
    }
  `]
})
export class AppointmentListComponent implements OnInit {
  appointments: PatientAppointmentDTO[] = [];
  loading = false;
  error: string | null = null;
  
  constructor(private appointmentService:PatientAppointmentService,    private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.loadAppointments();
  }
  
  loadAppointments(): void {
    this.loading = true;
    this.error = null;
    
    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.error = 'Failed to load appointments. Please try again.';
        this.loading = false;
      }
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
}