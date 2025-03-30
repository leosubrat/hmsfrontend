// src/app/services/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = environments.apiUrl;
  
  constructor(private http: HttpClient) { }
  
  getAllDoctors(): Observable<DoctorDto[]> {
    return this.http.get<DoctorDto[]>(`${this.baseUrl}/doctor/list`);
  }
}