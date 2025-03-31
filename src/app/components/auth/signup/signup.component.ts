// src/app/components/auth/signup/signup.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule, ToastModule],
  providers: [MessageService], // Add MessageService to the component providers
  template: `
    <!-- PrimeNG Toast component -->
    <p-toast></p-toast>
    
    <div class="signup-container">
      <div class="signup-card">
        <h2>Create {{ roleTitle }} Account</h2>
        <p>Please fill out the form below to create your {{ roleType }} account</p>
        
        <!-- Read-only role field displaying the selected role -->
        <div class="form-group">
          <label for="role">Role</label>
          <div class="input-container">
            <input 
              type="text" 
              id="role" 
              [value]="roleTitle"
              readonly
              class="readonly-field"
            >
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </span>
          </div>
        </div>
        
        <!-- First Name Field -->
        <div class="form-group">
          <label for="firstName">First Name</label>
          <div class="input-container">
            <input 
              type="text" 
              id="firstName" 
              placeholder="Enter your first name" 
              [(ngModel)]="signupData.firstName"
            >
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </span>
          </div>
        </div>
        
        <!-- Last Name Field -->
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <div class="input-container">
            <input 
              type="text" 
              id="lastName" 
              placeholder="Enter your last name" 
              [(ngModel)]="signupData.lastName"
            >
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <div class="input-container">
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              [(ngModel)]="signupData.email"
            >
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <div class="input-container">
            <input 
              type="tel" 
              id="phone" 
              placeholder="Enter your phone number" 
              [(ngModel)]="signupData.phone"
            >
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </span>
          </div>
        </div>
        
        <!-- Additional fields for doctors -->
        <ng-container *ngIf="roleType === 'doctor'">
          <div class="form-group">
            <label for="specialization">Specialization</label>
            <div class="input-container">
              <select id="specialization" [(ngModel)]="signupData.specialization">
                <option value="">Select Specialization</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="psychiatry">Psychiatry</option>
                <option value="general">General Medicine</option>
              </select>
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="license">Medical License Number</label>
            <div class="input-container">
              <input 
                type="text" 
                id="license" 
                placeholder="Enter your medical license number" 
                [(ngModel)]="signupData.licenseNumber"
              >
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
              </span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="experience">Years of Experience</label>
            <div class="input-container">
              <input 
                type="number" 
                id="experience" 
                placeholder="Years of experience" 
                [(ngModel)]="signupData.yearsOfExperience"
                min="0"
                max="50"
              >
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </span>
            </div>
          </div>
        </ng-container>
        
        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-container">
            <input 
              [type]="showPassword ? 'text' : 'password'" 
              id="password" 
              placeholder="Create a password" 
              [(ngModel)]="signupData.password"
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
          <div class="password-strength" *ngIf="signupData.password">
            <div class="strength-indicator" [ngClass]="getPasswordStrengthClass()"></div>
            <span class="strength-text">{{ getPasswordStrengthText() }}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div class="input-container">
            <input 
              [type]="showConfirmPassword ? 'text' : 'password'" 
              id="confirmPassword" 
              placeholder="Confirm your password" 
              [(ngModel)]="confirmPassword"
            >
            <span 
              class="input-icon clickable" 
              (click)="showConfirmPassword = !showConfirmPassword"
            >
              <svg *ngIf="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"/>
              </svg>
              <svg *ngIf="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>
              </svg>
            </span>
          </div>
          <div class="password-match" *ngIf="signupData.password && confirmPassword">
            <span class="match-indicator" [ngClass]="{ 'match': passwordsMatch(), 'no-match': !passwordsMatch() }">
              {{ passwordsMatch() ? '✓ Passwords match' : '✗ Passwords do not match' }}
            </span>
          </div>
        </div>
        
        <div class="form-group terms-privacy">
          <div class="checkbox-container">
            <input type="checkbox" id="terms" [(ngModel)]="termsAccepted">
            <label for="terms">
              I agree to the <a href="#" class="link">Terms of Service</a> and <a href="#" class="link">Privacy Policy</a>
            </label>
          </div>
        </div>
        
        <button 
          class="signup-button" 
          [disabled]="!termsAccepted || !isFormValid() || isLoading" 
          (click)="signup()"
        >
          <span *ngIf="isLoading">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            Creating Account...
          </span>
          <span *ngIf="!isLoading">Create Account</span>
        </button>
        
        <div class="login-link">
          Already have an account? <a routerLink="/auth/login" class="link">Log in</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    // Previous styles remain
    `
    .signup-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 150px);
      background-color: #f5f8fa;
      padding: 20px;
    }
    
    .signup-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      padding: 40px;
      width: 100%;
      max-width: 550px;
    }
    
    h2 {
      font-size: 1.8rem;
      color: #0d2437;
      margin-bottom: 15px;
      font-weight: 600;
    }
    
    p {
      color: #666;
      margin-bottom: 25px;
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
    
    input, select {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    input:focus, select:focus {
      border-color: #4db6ac;
      outline: none;
      box-shadow: 0 0 0 2px rgba(77, 182, 172, 0.2);
    }
    
    .readonly-field {
      background-color: #f5f8fa;
      cursor: not-allowed;
    }
    
    select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: #fff;
      cursor: pointer;
    }
    
    .input-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #888;
      pointer-events: none;
    }
    
    .input-icon.clickable {
      pointer-events: auto;
      cursor: pointer;
    }
    
    .terms-privacy label {
      font-weight: normal;
      display: inline-block;
      margin-left: 8px;
    }
    
    .checkbox-container {
      display: flex;
      align-items: flex-start;
    }
    
    .checkbox-container input {
      width: auto;
      margin-top: 4px;
    }
    
    .link {
      color: #4db6ac;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .link:hover {
      color: #00897b;
      text-decoration: underline;
    }
    
    .signup-button {
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
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    
    .signup-button:hover:not(:disabled) {
      background-color: #00897b;
    }
    
    .signup-button:disabled {
      background-color: #b0bec5;
      cursor: not-allowed;
    }
    
    .login-link {
      text-align: center;
      color: #666;
    }
    
    /* Password strength indicator */
    .password-strength {
      margin-top: 8px;
      display: flex;
      align-items: center;
    }
    
    .strength-indicator {
      height: 4px;
      flex: 1;
      border-radius: 2px;
      margin-right: 10px;
    }
    
    .strength-indicator.weak {
      background-color: #f44336;
    }
    
    .strength-indicator.medium {
      background-color: #ff9800;
    }
    
    .strength-indicator.strong {
      background-color: #4caf50;
    }
    
    .strength-text {
      font-size: 0.8rem;
    }
    
    /* Password match indicator */
    .password-match {
      margin-top: 8px;
    }
    
    .match-indicator {
      font-size: 0.8rem;
    }
    
    .match-indicator.match {
      color: #4caf50;
    }
    
    .match-indicator.no-match {
      color: #f44336;
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
    
    @media (max-width: 768px) {
      .signup-card {
        padding: 30px 20px;
      }
    }
    `
  ]
})
export class SignupComponent implements OnInit {
  roleType: string = 'user';
  roleTitle: string = 'User';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  termsAccepted: boolean = false;
  isLoading: boolean = false;
  confirmPassword: string = '';
  
  signupData: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'USER'
  };
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    // Get the role from the route parameters
    this.route.params.subscribe(params => {
      if (params['role']) {
        this.roleType = params['role'].toLowerCase();
        this.roleTitle = this.roleType.charAt(0).toUpperCase() + this.roleType.slice(1);
        
        // Set the role value for the API request (uppercase as required by backend)
        this.signupData.role = this.roleType.toUpperCase();
      }
    });
  }
  
  passwordsMatch(): boolean {
    return this.signupData.password === this.confirmPassword;
  }
  
  getPasswordStrength(): number {
    const password = this.signupData.password;
    if (!password) return 0;
    
    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1; // Has uppercase
    if (/[a-z]/.test(password)) strength += 1; // Has lowercase
    if (/[0-9]/.test(password)) strength += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Has special char
    
    return Math.min(Math.floor(strength / 1.6), 3); // Scale to 0-3
  }
  
  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength === 0) return '';
    if (strength === 1) return 'weak';
    if (strength === 2) return 'medium';
    return 'strong';
  }
  
  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength === 0) return 'Too short';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Medium';
    return 'Strong';
  }
  
  isFormValid(): boolean {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
    
    if (this.roleType === 'doctor') {
      requiredFields.push('specialization', 'licenseNumber', 'yearsOfExperience');
    }
    
    const hasEmptyFields = requiredFields.some(field => {
      const value = this.signupData[field];
      return value === '' || value === null || value === undefined;
    });
    
    const passwordStrong = this.getPasswordStrength() >= 1;
    
    const passwordsMatch = this.passwordsMatch();
    
    return !hasEmptyFields && passwordStrong && passwordsMatch;
  }
  
  signup(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Form Validation',
        detail: 'Please fill in all required fields correctly'
      });
      return;
    }
    
    this.isLoading = true;
    
    this.authService.signup(this.signupData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.isLoading = false;
        
        // Show success toast with PrimeNG
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Complete',
          detail: response.message || 'Account created successfully!'
        });
        
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1500);
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.isLoading = false;
        
        if (error.status === 409 || 
            (error.error && error.error.message && 
             error.error.message.includes('already'))) {
          // Email already exists error
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: 'This email is already registered'
          });
        } else if (error.error && error.error.message) {
          // Server sent specific error message
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: error.error.message
          });
        } else if (error.status === 0) {
          // Server is likely down or network issue
          this.messageService.add({
            severity: 'error',
            summary: 'Connection Error',
            detail: 'Server is unreachable. Please check your internet connection.'
          });
        } else {
          // Generic error
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: 'An unexpected error occurred. Please try again later.'
          });
        }
      }
    });
  }
}