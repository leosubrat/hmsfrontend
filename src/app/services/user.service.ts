// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';
import { UserDto } from '../models/doctor.model';

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
}