// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';
import { UserDto } from '../models/doctor.model';
import { ApiResponse } from './auth.service';
export interface UserDoctorDto {
  id: number;
  username: string;
  email: string;
  role: string;
  firstName:string;
  lastName:string
  middleName:string
  phone:string
  // Add any other fields from your DTO
}

export interface UserResponse {
  data: UserDoctorDto[];
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private baseUrl = `${environments.apiUrl}`;

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserDto> {
    const token = localStorage.getItem('access_token'); // or from your auth service
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserDto>(`${this.baseUrl}/user/profile`,{headers});
  }

  updateUserProfile(userDto: UserDto): Observable<UserDto> {
    const token = localStorage.getItem('access_token'); // or from your auth service
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<UserDto>(`${this.baseUrl}/user/update`,userDto,{headers});
  }
  getUserDetails(): Observable<UserDto> {
    const token = localStorage.getItem('access_token'); // or from your auth service
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserDto>(`${this.baseUrl}/get/user/detail`,{headers});
  }
  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/get-all-user`);
  }
  updateUser(id: number, userData: UserDoctorDto): Observable<ApiResponse> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put<ApiResponse>(`${this.baseUrl}/update-user`, userData, { params });
  }
  
  deleteUser(id: number): Observable<ApiResponse> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<ApiResponse>(`${this.baseUrl}/delete-user`, { params });
  }
}