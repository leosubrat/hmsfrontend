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
  updateDoctorProfileWithPhoto(doctorDto: DoctorDto): Observable<any> {
    const headers= this.getAuthHeaders();
    console.log(headers);
    return this.http.put<any>(
      `${this.baseUrl}/doctor/update`, 
      { headers }
    ).pipe(
      catchError(error => {
        console.error('Error updating doctor profile with photo', error);
        return of({ success: false, message: 'Error updating information' });
      })
    );
  }
}
