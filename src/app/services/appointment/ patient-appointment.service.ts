// patient-appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError,of } from 'rxjs';
import { PatientAppointmentDTO } from '../../models/patientAppointmentDTO';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientAppointmentService {
    private baseUrl = environments.apiUrl;

  constructor(private http: HttpClient) { }

  savePatientAppointment(appointmentDTO: PatientAppointmentDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/save/patient-appointment`, appointmentDTO)
      .pipe(
        catchError(error => {
          console.error('HTTP Error:', error);
          return throwError(() => error);
        })
      );
  }

  getAllAppointments(): Observable<PatientAppointmentDTO[]> {
    const token = localStorage.getItem('access_token'); // or from your auth service
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<PatientAppointmentDTO[]>(`${this.baseUrl}/appointment-list`, { headers });
  }

   // Add this method to fetch patient appointments
   getPatientAppointments(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<any[]>(`${this.baseUrl}/patient/detail`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching patient appointments:', error);
        return of([]);
      })
    );
  }
  updateAppointmentStatus(appointmentId: number, status: 'APPROVED' | 'DECLINED'): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.patch(`${this.baseUrl}/appointments/${appointmentId}/status`, { status }, { headers }).pipe(
      catchError(error => {
        console.error(`Error updating appointment status to ${status}:`, error);
        throw error;
      })
    );
  }
}