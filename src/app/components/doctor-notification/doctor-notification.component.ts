// doctor-notification.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environment';

interface PatientAppointment {
  id: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  reasonForVisit: string;
  insurance: string;
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
  newPatient: boolean;
}

@Component({
  selector: 'app-doctor-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-bell" (click)="toggleAppointmentModal()">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
      </svg>
      <span class="notification-count" *ngIf="appointmentRequests.length > 0">
        {{ appointmentRequests.length }}
      </span>
    </div>

    <!-- Appointment Request Modal -->
    <div class="modal-overlay" *ngIf="showAppointmentModal">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Patient Appointment Requests</h2>
          <button class="close-button" (click)="toggleAppointmentModal()">×</button>
        </div>

        <div class="modal-body">
          <div *ngFor="let appointment of appointmentRequests" class="appointment-card">
            <div class="patient-header">
              <div class="patient-avatar">
                {{ getInitials(appointment.patientName) }}
              </div>
              <div class="patient-name">
                <h3>{{ appointment.patientName }}</h3>
              </div>
            </div>

            <div class="appointment-details">
              <div class="detail-row">
                <strong>Date:</strong> {{ formatDate(appointment.appointmentDate) }}
              </div>
              <div class="detail-row">
                <strong>Time:</strong> {{ appointment.appointmentTime }}
              </div>
              <div class="detail-row">
                <strong>Reason:</strong> {{ appointment.reasonForVisit }}
              </div>
            </div>

            <div class="patient-contact">
              <div class="detail-row">
                <strong>Email:</strong> {{ appointment.patientEmail }}
              </div>
              <div class="detail-row">
                <strong>Phone:</strong> {{ appointment.patientPhone }}
              </div>
            </div>

            <div class="appointment-actions">
              <button class="decline-button" (click)="handleAppointment(appointment.id, 'DECLINED')">
                Decline
              </button>
              <button class="approve-button" (click)="handleAppointment(appointment.id, 'APPROVED')">
                Approve
              </button>
            </div>
          </div>

          <div *ngIf="appointmentRequests.length === 0" class="no-appointments">
            No pending appointment requests
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-bell {
      position: relative;
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #f5f5f5;
    }

    .notification-bell:hover {
      background-color: #e0e0e0;
    }

    .notification-count {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #e53935;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-overlay {
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
    }

    .modal-container {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #eee;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 20px;
      color: #333;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
    }

    .modal-body {
      padding: 20px;
      overflow-y: auto;
      max-height: calc(90vh - 60px);
    }

    .appointment-card {
      border: 1px solid #eee;
      border-radius: 8px;
      margin-bottom: 16px;
      overflow: hidden;
    }

    .patient-header {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: #f9f9f9;
      border-bottom: 1px solid #eee;
    }

    .patient-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #4db6ac;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      margin-right: 16px;
    }

    .patient-name h3 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }

    .appointment-details, .patient-contact {
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    .detail-row {
      margin-bottom: 8px;
      font-size: 14px;
    }

    .detail-row:last-child {
      margin-bottom: 0;
    }

    .appointment-actions {
      display: flex;
      padding: 16px;
      justify-content: flex-end;
      gap: 12px;
    }

    .decline-button, .approve-button {
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      border: none;
    }

    .decline-button {
      background-color: #fff;
      color: #f44336;
      border: 1px solid #f44336;
    }

    .approve-button {
      background-color: #4caf50;
      color: white;
    }

    .no-appointments {
      text-align: center;
      padding: 32px 16px;
      color: #666;
      font-style: italic;
    }
  `]
})
export class DoctorNotificationComponent implements OnInit {
  @Input() doctorId: number = 0;
  showAppointmentModal: boolean = false;
  appointmentRequests: PatientAppointment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAppointmentRequests();
  }

  toggleAppointmentModal(): void {
    this.showAppointmentModal = !this.showAppointmentModal;

    if (this.showAppointmentModal) {
      this.fetchAppointmentRequests();
    }
  }

  fetchAppointmentRequests(): void {
    const token = localStorage.getItem('access_token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<PatientAppointment[]>(`${environments.apiUrl}/patient/detail`, { headers })
      .subscribe({
        next: (data) => {
          this.appointmentRequests = data;
        },
        error: (error) => {
          console.error('Error fetching appointment requests:', error);
        }
      });
  }

  handleAppointment(appointmentId: number, status: string): void {
    const token = localStorage.getItem('access_token');
    const headers = { 'Authorization': `Bearer ${token}` };
      
    if (status === 'APPROVED') {
      // Call your specific APPROVED endpoint with appointmentId
      this.http.post(`${environments.apiUrl}/appointments/approved`, null, {
        headers,
        params: { appointmentId: appointmentId.toString() }  // Send appointmentId instead of status
      }).subscribe({
        next: () => {
          this.appointmentRequests = this.appointmentRequests.filter(a => a.id !== appointmentId);    
          if (this.appointmentRequests.length === 0) {
            this.showAppointmentModal = false;
          }
        },
        error: (error) => {
          console.error('Error approving appointment:', error);
          alert('Failed to approve appointment. Please try again.');
        }
      });
    } else if (status === 'DECLINED') {
      this.http.post(`${environments.apiUrl}/appointments/declined`, null, {  // Different endpoint for declined
        headers,
        params: { appointmentId: appointmentId.toString() }  // Send appointmentId instead of status
      }).subscribe({
        next: () => {
          // Remove the appointment from the list after declining
          this.appointmentRequests = this.appointmentRequests.filter(a => a.id !== appointmentId);
          if (this.appointmentRequests.length === 0) {
            this.showAppointmentModal = false;
          }
        },
        error: (error) => {
          console.error('Error declining appointment:', error);
          alert('Failed to decline appointment. Please try again.');
        }
      });
    }
  }

  getInitials(name: string): string {
    if (!name) return 'US';
    
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
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