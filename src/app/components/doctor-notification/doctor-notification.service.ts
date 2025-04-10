// src/app/services/doctor/doctor-notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environments } from '../../../environments/environment';

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
  
  constructor(private http: HttpClient) { }
  
  get unreadCount$(): Observable<number> {
    return this.unreadNotificationsCount.asObservable();
  }
  
  getDoctorNotifications(doctorId: number): Observable<DoctorNotification[]> {
    return this.http.get<DoctorNotification[]>(`${this.baseUrl}/${doctorId}`);
  }
  
  getUnreadNotificationCount(doctorId: number): Observable<{count: number}> {
    const token = localStorage.getItem('access_token'); // or from your auth service
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get<{count: number}>(`${this.baseUrl}/${doctorId}/count`,{headers})
      .pipe(
        tap(response => this.unreadNotificationsCount.next(response.count))
      );
  }
  
  markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${notificationId}/read`, {})
      .pipe(
        tap(() => {
          const currentCount = this.unreadNotificationsCount.value;
          if (currentCount > 0) {
            this.unreadNotificationsCount.next(currentCount - 1);
          }
        })
      );
  }
  
  markAllNotificationsAsRead(doctorId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${doctorId}/read-all`, {})
      .pipe(
        tap(() => this.unreadNotificationsCount.next(0))
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
}