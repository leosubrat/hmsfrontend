// src/app/components/doctor-notification/doctor-notification.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorNotificationService } from './doctor-notification.service';
import { PatientAppointmentService } from '../../services/appointment/ patient-appointment.service';


@Component({
  selector: 'app-doctor-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      <div class="notification-bell" (click)="togglePatientList()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
        </svg>
        <span class="notification-badge" *ngIf="unreadCount > 0">{{ unreadCount }}</span>
      </div>
      
      <!-- Patient list popup -->
      <div class="patient-list-modal" *ngIf="showPatientList">
        <div class="patient-list-content">
          <div class="modal-header">
            <h3>Patient Appointment Requests</h3>
            <button class="close-btn" (click)="closePatientList()">×</button>
          </div>
          
          <div class="patients-container">
            <div *ngIf="loading" class="loading-spinner">
              <div class="spinner"></div>
              <p>Loading patient appointments...</p>
            </div>
            
            <div *ngIf="!loading && patients.length === 0" class="no-patients">
              No pending appointment requests
            </div>
            
            <div *ngIf="!loading && patients.length > 0" class="patient-cards">
              <div *ngFor="let patient of patients" class="patient-card">
                <div class="patient-info">
                  <div class="avatar">{{ getInitials(patient.patientName) }}</div>
                  <div class="details">
                    <h4>{{ patient.patientName }}</h4>
                    <p><strong>Date:</strong> {{ formatDate(patient.appointmentDate) }}</p>
                    <p><strong>Time:</strong> {{ patient.appointmentTime }}</p>
                    <p><strong>Reason:</strong> {{ patient.reasonForVisit }}</p>
                    <p *ngIf="patient.isNewPatient" class="new-tag">New Patient</p>
                  </div>
                </div>
                <div class="contact-info">
                  <p><strong>Email:</strong> {{ patient.patientEmail }}</p>
                  <p><strong>Phone:</strong> {{ patient.patientPhone }}</p>
                </div>
                <div class="actions" *ngIf="patient.status === 'PENDING'">
                  <button class="decline-btn" (click)="updateStatus(patient.id, 'DECLINED')">Decline</button>
                  <button class="approve-btn" (click)="updateStatus(patient.id, 'APPROVED')">Approve</button>
                </div>
                <div class="status-badge" [ngClass]="patient.status.toLowerCase()" *ngIf="patient.status !== 'PENDING'">
                  {{ patient.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: relative;
    }
    
    .notification-bell {
      position: relative;
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }
    
    .notification-bell:hover {
      background-color: #e0e0e0;
    }
    
    .notification-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #f44336;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Patient list modal */
    .patient-list-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .patient-list-content {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #eee;
    }
    
    .modal-header h3 {
      margin: 0;
      color: #333;
      font-size: 18px;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      line-height: 1;
      color: #666;
      cursor: pointer;
    }
    
    .patients-container {
      padding: 20px;
      overflow-y: auto;
      max-height: calc(90vh - 70px);
    }
    
    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #4db6ac;
      animation: spin 1s ease-in-out infinite;
      margin-bottom: 15px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .no-patients {
      text-align: center;
      padding: 30px;
      color: #666;
    }
    
    .patient-cards {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .patient-card {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .patient-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .patient-info {
      display: flex;
      margin-bottom: 12px;
    }
    
    .avatar {
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
      margin-right: 16px;
    }
    
    .details h4 {
      margin: 0 0 6px 0;
      color: #333;
    }
    
    .details p {
      margin: 2px 0;
      font-size: 14px;
      color: #555;
    }
    
    .new-tag {
      display: inline-block;
      background-color: #e8f5e9;
      color: #4caf50;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin-top: 4px;
    }
    
    .contact-info {
      border-top: 1px solid #eee;
      padding-top: 12px;
      margin-bottom: 12px;
    }
    
    .contact-info p {
      margin: 4px 0;
      font-size: 14px;
      color: #555;
    }
    
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    .decline-btn, .approve-btn {
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }
    
    .decline-btn {
      background-color: #fff;
      color: #f44336;
      border: 1px solid #f44336;
    }
    
    .decline-btn:hover {
      background-color: #ffebee;
    }
    
    .approve-btn {
      background-color: #4caf50;
      color: white;
    }
    
    .approve-btn:hover {
      background-color: #43a047;
    }
    
    .status-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      margin-top: 8px;
    }
    
    .status-badge.approved {
      background-color: #e8f5e9;
      color: #4caf50;
    }
    
    .status-badge.declined {
      background-color: #ffebee;
      color: #f44336;
    }
  `]
})
export class DoctorNotificationComponent implements OnInit {
  @Input() doctorId!: number;
  
  unreadCount: number = 0;
  showPatientList: boolean = false;
  loading: boolean = false;
  patients: any[] = [];
  
  constructor(
    private notificationService: DoctorNotificationService,
    private appointmentService: PatientAppointmentService
  ) {}
  
  ngOnInit(): void {
    // Subscribe to unread count updates
    this.notificationService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });
    
    // Fetch initial unread count
    if (this.doctorId) {
      this.notificationService.getUnreadNotificationCount(this.doctorId).subscribe();
    }
  }
  
  togglePatientList(): void {
    this.showPatientList = !this.showPatientList;
    
    if (this.showPatientList) {
      this.loadPatientAppointments();
    }
  }
  
  closePatientList(): void {
    this.showPatientList = false;
  }
  
  loadPatientAppointments(): void {
    this.loading = true;
    
    this.appointmentService.getPatientAppointments().subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
        
        // Mark notifications as read
        this.notificationService.markAllNotificationsAsRead(this.doctorId).subscribe();
      },
      error: (error) => {
        console.error('Error loading patient appointments:', error);
        this.loading = false;
      }
    });
  }
  
  updateStatus(appointmentId: number, status: 'APPROVED' | 'DECLINED'): void {
    this.appointmentService.updateAppointmentStatus(appointmentId, status).subscribe({
      next: () => {
        // Update the status in the UI
        const appointment = this.patients.find(p => p.id === appointmentId);
        if (appointment) {
          appointment.status = status;
        }
        
        // Show toast message (you can add a toast service for this)
        console.log(`Appointment ${status.toLowerCase()} successfully`);
      },
      error: (error) => {
        console.error(`Error updating appointment status:`, error);
      }
    });
  }
  
  getInitials(name: string): string {
    if (!name) return '';
    
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }
  
  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }
}