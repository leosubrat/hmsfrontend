// src/app/components/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService, SigninRequest } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule, ToastModule],
  providers: [MessageService],
  template: `
    <!-- PrimeNG Toast component -->
    <p-toast></p-toast>
    
    <div class="login-container">
      <div class="login-panel">
        <div class="login-left">
          <h1>Log In</h1>
          <p>Select your Log In method from the following:</p>
          
          <div class="role-selection">
            <div 
              class="role-card" 
              [class.active]="selectedRole === 'user'"
              (click)="selectRole('user')"
            >
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <span>User<br />Log In</span>
            </div>
            
            <div 
              class="role-card" 
              [class.active]="selectedRole === 'doctor'"
              (click)="selectRole('doctor')"
            >
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8C3.45 8 3 8.45 3 9v5c0 .55.45 1 1 1h3v1h10v-1h3c.55 0 1-.45 1-1v-1h-9v-5H4z"/>
                </svg>
              </div>
              <span>Doctor<br />Log In</span>
            </div>
            
            <div 
              class="role-card" 
              [class.active]="selectedRole === 'merchant'"
              (click)="selectRole('merchant')"
            >
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <span>Merchant<br />Log In</span>
            </div>
          </div>
        </div>
        
        <div class="login-right">
          <h2>{{ getRoleTitle() }} Log In</h2>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-container">
              <input 
                type="text" 
                id="email" 
                placeholder="Email" 
                [(ngModel)]="credentials.email"
              >
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
                </svg>
              </span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-container">
              <input 
                [type]="showPassword ? 'text' : 'password'" 
                id="password" 
                placeholder="Password" 
                [(ngModel)]="credentials.password"
              >
              <span 
                class="input-icon clickable" 
                (click)="showPassword = !showPassword"
              >
                <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"/>
                </svg>
                <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>
                </svg>
              </span>
            </div>
          </div>
          
          <div class="form-group remember-forgot">
            <div class="remember-me">
              <input type="checkbox" id="remember" [(ngModel)]="rememberMe">
              <label for="remember">Keep me Logged In</label>
            </div>
            <a routerLink="/auth/forgot-password" class="forgot-link">Forgot Password?</a>
          </div>
          
          <button 
            class="login-button" 
            [disabled]="!isFormValid() || isLoading" 
            (click)="login()"
          >
            <span *ngIf="isLoading">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
              Logging in...
            </span>
            <span *ngIf="!isLoading">Log In</span>
          </button>
          
          <!-- Create Account Section - Only show for User and Doctor roles -->
          <div class="create-account" *ngIf="selectedRole === 'user' || selectedRole === 'doctor'">
            <div class="divider">
              <span>OR</span>
            </div>
            
            <button 
              class="create-account-button" 
              [routerLink]="['/auth/signup', selectedRole]"
            >
              Create {{ getRoleTitle() }} Account
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    // Same styles as before
    `
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 150px);
      background-color: #f5f8fa;
      padding: 20px;
    }
    
    .login-panel {
      display: flex;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 900px;
    }
    
    .login-left {
      background-color: #f5f8fa;
      padding: 40px;
      width: 40%;
    }
    
    .login-right {
      padding: 40px;
      width: 60%;
    }
    
    h1 {
      font-size: 2.5rem;
      color: #0d2437;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    h2 {
      font-size: 1.8rem;
      color: #0d2437;
      margin-bottom: 25px;
      font-weight: 600;
    }
    
    p {
      color: #666;
      margin-bottom: 30px;
    }
    
    .role-selection {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .role-card {
      display: flex;
      align-items: center;
      padding: 15px;
      background-color: #fff;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
    
    .role-card.active {
      background-color: #4db6ac;
      color: white;
    }
    
    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(77, 182, 172, 0.2);
      margin-right: 15px;
      color: #4db6ac;
    }
    
    .role-card.active .icon-container {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      color: #0d2437;
      font-weight: 500;
    }
    
    .input-container {
      position: relative;
    }
    
    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    input[type="text"]:focus,
    input[type="password"]:focus {
      border-color: #4db6ac;
      outline: none;
      box-shadow: 0 0 0 2px rgba(77, 182, 172, 0.2);
    }
    
    .input-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #888;
    }
    
    .clickable {
      cursor: pointer;
    }
    
    .remember-forgot {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .remember-me {
      display: flex;
      align-items: center;
    }
    
    .remember-me input {
      margin-right: 8px;
    }
    
    .forgot-link {
      color: #4db6ac;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .forgot-link:hover {
      color: #00897b;
    }
    
    .login-button {
      width: 100%;
      padding: 14px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    
    .login-button:hover {
      background-color: #00897b;
    }
    
    .login-button:disabled {
      background-color: #b0bec5;
      cursor: not-allowed;
    }
    
    /* Loading spinner */
    .spinner {
      animation: rotate 2s linear infinite;
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
    
    .spinner .path {
      stroke: #ffffff;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
    
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
    
    /* Create Account Section Styles */
    .create-account {
      margin-top: 25px;
    }
    
    .divider {
      position: relative;
      text-align: center;
      margin: 15px 0;
    }
    
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #e0e0e0;
    }
    
    .divider span {
      position: relative;
      display: inline-block;
      padding: 0 10px;
      background-color: #fff;
      color: #757575;
      font-size: 0.9rem;
    }
    
    .create-account-button {
      width: 100%;
      padding: 14px;
      background-color: #ffffff;
      color: #4db6ac;
      border: 1px solid #4db6ac;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .create-account-button:hover {
      background-color: rgba(77, 182, 172, 0.1);
    }
    
    @media (max-width: 768px) {
      .login-panel {
        flex-direction: column;
      }
      
      .login-left,
      .login-right {
        width: 100%;
        padding: 30px;
      }
      
      .role-selection {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .role-card {
        flex: 1;
        min-width: 120px;
        flex-direction: column;
        text-align: center;
      }
      
      .icon-container {
        margin-right: 0;
        margin-bottom: 10px;
      }
      
      .remember-forgot {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }
    `
  ]
})
export class LoginComponent {
  selectedRole: string = 'user';
  showPassword: boolean = false;
  rememberMe: boolean = false;
  isLoading: boolean = false;
  
  credentials: SigninRequest = {
    email: '',
    password: ''
  };
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  
  selectRole(role: string): void {
    this.selectedRole = role;
  }
  
  getRoleTitle(): string {
    return this.selectedRole.charAt(0).toUpperCase() + this.selectedRole.slice(1);
  }
  
  isFormValid(): string {
    return this.credentials.email && this.credentials.password;
  }
  
  login(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Form Validation',
        detail: 'Please enter your email and password'
      });
      return;
    }
    
    this.isLoading = true;
    
    this.authService.signin(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.isLoading = false;
        
        // Show success toast
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: response.message || 'Welcome back!'
        });
        
        // Redirect based on role - this would need to be determined from the token
        // For now, we'll just redirect to the home page
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        
        if (error.status === 401 || 
            (error.error && error.error.message && 
             error.error.message.toLowerCase().includes('invalid'))) {
          // Invalid credentials
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid email or password'
          });
        } else if (error.error && error.error.message) {
          // Server sent specific error message
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: error.error.message
          });
        } else if (error.status === 0) {
          // Server is likely down
          this.messageService.add({
            severity: 'error',
            summary: 'Connection Error',
            detail: 'Server is unreachable. Please check your internet connection.'
          });
        } else {
          // Generic error
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'An unexpected error occurred. Please try again later.'
          });
        }
      }
    });
  }
}