// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
  role:string;
}

export interface ApiResponse {
  message: string;
  status?: string;
  data?: any;
}
interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environments.apiUrl;
  private tokenKey = 'access_token';
  private userRoleSubject = new BehaviorSubject<string>('');
  public userRole$ = this.userRoleSubject.asObservable();
 private authStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
 authStateChanged$ = this.authStateSubject.asObservable();
  constructor(private http: HttpClient) { }
    signup(signupData: SignupData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/signup`, signupData);
  }
  
  signin(credentials: SigninRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/auth/signin`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
          const decodedToken = this.parseJwt(response.accessToken);
          console.log("decode token:::"+decodedToken)
          if (decodedToken) {
            localStorage.setItem('user_role', decodedToken.role);
            console.log('User role:', decodedToken.role);
          }
        })
      );
  }
   // Parse JWT token without using external libraries
   parseJwt(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload) as JwtPayload;
    } catch (e) {
      console.error('Error parsing JWT token:', e);
      return null;
    }
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
  
  // logout(): void {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('refresh_token');
  // }
  logout(): void {
    localStorage.removeItem('access_token');
        this.authStateSubject.next(false);
  }
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
  getCurrentUserRole(): string {
    return this.userRoleSubject.value || localStorage.getItem('user_role') || '';
  }
  
  isDoctor(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'ROLE_DOCTOR';
  }
  isUser(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'ROLE_USER';
  }
  isAdmin(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'ROLE_ADMIN';
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}