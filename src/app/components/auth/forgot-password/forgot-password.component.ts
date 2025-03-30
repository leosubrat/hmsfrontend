// src/app/components/auth/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="forgot-password-container">
      <div class="forgot-password-card">
        <h2>Forgot Password</h2>
        <p>Please enter your email address to receive a password reset link.</p>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <div class="input-container">
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              [(ngModel)]="email"
            >
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#1e88e5">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
              </svg>
            </span>
          </div>
        </div>
        
        <button class="reset-button" (click)="resetPassword()">
          Reset Password
        </button>
        
        <div class="back-to-login">
          <a routerLink="/auth/login">Back to Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 150px);
      background-color: #f5f8fa;
      padding: 20px;
    }
    
    .forgot-password-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      padding: 40px;
      width: 100%;
      max-width: 450px;
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
      margin-bottom: 25px;
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
    
    input[type="email"] {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    input[type="email"]:focus {
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
    
    .reset-button {
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
    }
    
    .reset-button:hover {
      background-color: #00897b;
    }
    
    .back-to-login {
      text-align: center;
    }
    
    .back-to-login a {
      color: #4db6ac;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .back-to-login a:hover {
      color: #00897b;
    }
  `]
})
export class ForgotPasswordComponent {
  email: string = '';
  
  resetPassword(): void {
    console.log('Resetting password for email:', this.email);
    // Implement password reset logic here
  }
}