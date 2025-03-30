// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';
import { tap } from 'rxjs/operators';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  
  // Doctor specific fields
  specialization?: string;
  licenseNumber?: string;
  yearsOfExperience?: number;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface ApiResponse {
  message: string;
  status?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environments.apiUrl;
  
  constructor(private http: HttpClient) { }
    signup(signupData: SignupData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/signup`, signupData);
  }
  
  // Method to handle user/doctor signin
  signin(signinRequest: SigninRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/auth/signin`, signinRequest)
      .pipe(
        tap((response: JwtResponse) => {
          this.storeTokens(response.accessToken, response.refreshToken);
        })
      );
  }
    private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
  
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
  
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}