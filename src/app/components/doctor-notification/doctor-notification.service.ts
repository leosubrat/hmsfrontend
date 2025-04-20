// src/app/services/doctor/doctor-notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environments } from '../../../environments/environment';
import { PatientAppointmentService } from '../../services/appointment/ patient-appointment.service';

export interface DoctorNotification {
  id: number;
  doctorId: number;
  message: string;
  createdAt: string;
  isRead: boolean;
  appointmentType: string;
  appointmentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorNotificationService {
  private baseUrl = `${environments.apiUrl}/doctor/notifications`;
  private unreadNotificationsCount = new BehaviorSubject<number>(0);
  
  constructor(
    private http: HttpClient,
    private appointmentService: PatientAppointmentService
  ) {}
  
  // Component-related properties that should NOT be in a service
  // These should be moved to your component class
  showPatientDetails = false;
  selectedPatient: any = null;
  statusMessage = '';
  statusSuccess = true;
  
  get unreadCount$(): Observable<number> {
    return this.unreadNotificationsCount.asObservable();
  }
  
  getDoctorNotifications(doctorId: number): Observable<DoctorNotification[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<DoctorNotification[]>(`${this.baseUrl}/${doctorId}`, {headers}).pipe(
      catchError(error => {
        console.error('Error fetching doctor notifications:', error);
        return of([]);
      })
    );
  }
  
  getUnreadNotificationCount(doctorId: number): Observable<{count: number}> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<{count: number}>(`${this.baseUrl}/${doctorId}/count`, {headers})
      .pipe(
        tap(response => this.unreadNotificationsCount.next(response.count)),
        catchError(error => {
          console.error('Error fetching unread notification count:', error);
          return of({count: 0});
        })
      );
  }
  
  markNotificationAsRead(notificationId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.put(`${this.baseUrl}/${notificationId}/read`, {}, {headers})
      .pipe(
        tap(() => {
          const currentCount = this.unreadNotificationsCount.value;
          if (currentCount > 0) {
            this.unreadNotificationsCount.next(currentCount - 1);
          }
        }),
        catchError(error => {
          console.error('Error marking notification as read:', error);
          return of(null);
        })
      );
  }
  
  markAllNotificationsAsRead(doctorId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.put(`${this.baseUrl}/${doctorId}/read-all`, {}, {headers})
      .pipe(
        tap(() => this.unreadNotificationsCount.next(0)),
        catchError(error => {
          console.error('Error marking all notifications as read:', error);
          return of(null);
        })
      );
  }
  
  refreshNotificationCount(doctorId: number): void {
    if (doctorId > 0) {
      this.getUnreadNotificationCount(doctorId).subscribe({
        next: () => {},
        error: (error) => {
          console.error('Error refreshing notification count:', error);
        }
      });
    }
  }
  
  // This method fetches patient details when a notification is clicked
  getPatientDetailsForNotification(notificationId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<any>(`${environments.apiUrl}/patient/detail/${notificationId}`, {headers}).pipe(
      catchError(error => {
        console.error('Error fetching patient details for notification:', error);
        throw error;
      })
    );
  }
  
  // This method should be used through the appointmentService
  // But keeping it here for compatibility with existing code
  updateAppointmentStatus(appointmentId: number, status: 'APPROVED' | 'DECLINED'): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.patch(`${environments.apiUrl}/appointments/${appointmentId}/status`, { status }, {headers}).pipe(
      catchError(error => {
        console.error(`Error updating appointment status to ${status}:`, error);
        throw error;
      })
    );
  }
}