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

 
  /**
   * Gets the profile information for the currently logged in doctor
   * @returns Observable of the doctor profile
   */

  
  /**
   * Updates a doctor's profile with photo
   * @param doctorData - The doctor profile data
   * @param photoFile - Optional photo file to upload
   * @returns Observable of the API response
   */
  updateDoctorProfileWithPhoto(doctorData: any, photoFile?: File): Observable<any> {
    // If there's a photo, use FormData approach
    if (photoFile) {
      const formData = new FormData();
      formData.append('photo', photoFile);
      formData.append('doctorData', JSON.stringify(doctorData));
      return this.http.put(`${this.baseUrl}/update-profile`, formData);
    } 
    // Otherwise just send the JSON data
    else {
      return this.http.put(`${this.baseUrl}/update-profile`, doctorData);
    }
  }
/**
   * Gets all upcoming appointments for a doctor
   * @returns Observable of the appointments list
   */
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
/**
 * @returns Observable of the doctor's schedule
 */
getDoctorSchedule(): Observable<any> {
  return this.http.get(`${this.baseUrl}/schedule`);
}
}
