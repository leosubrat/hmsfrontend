// src/app/services/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environments } from '../../../environments/environment';
import { DoctorDto } from '../../models/doctor.model';
import { AuthService } from '../auth.service';

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface DoctorProfileUpdate {
  doctorId: number;
  doctorDescription: string;
  timeSlots: TimeSlot[];
}
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = environments.apiUrl;
  
  constructor(private http: HttpClient,private authService:AuthService) { }
  
  getAllDoctors(): Observable<DoctorDto[]> {
    return this.http.get<DoctorDto[]>(`${this.baseUrl}/doctor/list`);
  }
  getAuthHeaders(includeContentType: boolean = true): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    
    if (includeContentType) {
      headers = headers.set('Content-Type', 'application/json');
    }
    
    return headers;
  }



getDoctorAppointments(): Observable<any> {
  return this.http.get(`${this.baseUrl}/appointments`);
}
 /**
   * Gets the profile information for the currently logged in doctor
   * @returns Observable of the doctor profile
   */
 getDoctorProfile(): Observable<any> {
  const token = localStorage.getItem('access_token'); // or from your auth service
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.baseUrl}/doctor/notifications/profile`, { headers });}

getDoctorSchedule(): Observable<any> {
  return this.http.get(`${this.baseUrl}/schedule`);
}

  // Update the doctor profile
  updateDoctorProfile(doctorData: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log('Using token for authentication:', token ? 'Token exists' : 'No token found');
    return this.http.put(`${this.baseUrl}/doctor/update`, doctorData, { headers });
  }
}
