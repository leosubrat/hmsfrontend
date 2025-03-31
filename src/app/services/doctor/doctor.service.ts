// src/app/services/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environments } from '../../../environments/environment';
import { DoctorDto } from '../../models/doctor.model';

// export interface DoctorDto {
//   doctorId: number;
//   specialization: string;
//   licenseNumber: string;
//   yearsOfExperience: number;
//   user: {
//     userId: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//   };
// }
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
  
  constructor(private http: HttpClient) { }
  
  getAllDoctors(): Observable<DoctorDto[]> {
    return this.http.get<DoctorDto[]>(`${this.baseUrl}/doctor/list`);
  }

  updateDoctorProfile(doctorDto: DoctorDto): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/doctor/update`, doctorDto)
      .pipe(
        catchError(error => {
          console.error('Error updating doctor profile', error);
          return of({ success: false, message: 'Error updating information' });
        })
      );
  }
}