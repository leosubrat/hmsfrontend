// patient-appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { PatientAppointmentDTO } from '../../models/patientAppointmentDTO';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientAppointmentService {
    private baseUrl = environments.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Saves a new patient appointment
   * @param appointmentDTO - The appointment data to save
   * @returns An Observable of the API response
   */
  savePatientAppointment(appointmentDTO: PatientAppointmentDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/save/patient-appointment`, appointmentDTO)
      .pipe(
        catchError(error => {
          console.error('HTTP Error:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Gets all appointments for a patient
   * @param patientId - The ID of the patient
   * @returns An Observable of the patient's appointments
   */
  getPatientAppointments(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patient/${patientId}`);
  }

  /**
   * Gets all appointments for a doctor
   * @param doctorId - The ID of the doctor
   * @returns An Observable of the doctor's appointments
   */
  getDoctorAppointments(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctor/${doctorId}`);
  }

  /**
   * Cancels an existing appointment
   * @param appointmentId - The ID of the appointment to cancel
   * @returns An Observable of the API response
   */
  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${appointmentId}`);
  }

  /**
   * Updates an existing appointment
   * @param appointmentId - The ID of the appointment to update
   * @param appointmentDTO - The updated appointment data
   * @returns An Observable of the API response
   */
  updateAppointment(appointmentId: number, appointmentDTO: PatientAppointmentDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appointmentId}`, appointmentDTO);
  }
}