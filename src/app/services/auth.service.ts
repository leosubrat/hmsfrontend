// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';
import { tap } from 'rxjs/operators';

// Interfaces for API communication
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
  
  // Method to handle user/doctor signup
  signup(signupData: SignupData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/signup`, signupData);
  }
  
  // Method to handle user/doctor signin
  signin(signinRequest: SigninRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/auth/signin`, signinRequest)
      .pipe(
        tap((response: JwtResponse) => {
          // Store tokens in localStorage when user signs in
          this.storeTokens(response.accessToken, response.refreshToken);
        })
      );
  }
  
  // Store tokens in local storage
  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
  
  // Get access token from local storage
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
  // Get refresh token from local storage
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
  
  // Remove tokens (logout)
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  
  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}