// src/app/components/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="logo">
        <svg class="logo-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1e88e5">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15h-2v-2h2v2zm0-4h-2V8h2v6z"/>
        </svg>
        <div class="logo-text">Hospitality<span>Hub</span></div>
      </div>
      
      <ul class="nav-links">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
        <li><a routerLink="/about" routerLinkActive="active">About</a></li>
        <li><a routerLink="/services" routerLinkActive="active">Services</a></li>
        <li><a routerLink="/doctors" routerLinkActive="active">Doctors</a></li>
        <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
      </ul>
      
      <!-- Login button - ONLY shown when NOT logged in -->
      <button *ngIf="!isUserLoggedIn()" class="btn-login" routerLink="/auth/login">Login</button>
      
      <!-- User avatar - ONLY shown when logged in -->
      <div *ngIf="isUserLoggedIn()" class="user-dropdown">
        <div class="avatar" (click)="toggleDropdown()">
          <span>{{ getUserInitial() }}</span>
        </div>
        
        <div class="dropdown-content" [class.show]="showDropdown">
          <div class="user-email">{{ userEmail }}</div>
          <button class="logout-btn" (click)="logoutUser()">Logout</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 5%;
      background-color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .logo {
      display: flex;
      align-items: center;
    }
    
    .logo-img {
      height: 40px;
      margin-right: 10px;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e88e5;
    }
    
    .logo-text span {
      color: #01579b;
    }
    
    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-links li {
      margin: 0 1rem;
    }
    
    .nav-links a {
      text-decoration: none;
      color: #37474f;
      font-weight: 500;
      font-size: 1rem;
      transition: color 0.3s ease;
    }
    
    .nav-links a.active, .nav-links a:hover {
      color: #1e88e5;
    }
    
    .btn-login {
      padding: 0.6rem 1.2rem;
      border-radius: 4px;
      background-color: transparent;
      border: 1px solid #1e88e5;
      color: #1e88e5;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-login:hover {
      background-color: rgba(30, 136, 229, 0.1);
    }
    
    .user-dropdown {
      position: relative;
    }
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #80cbc4;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
    
    .dropdown-content {
      position: absolute;
      right: 0;
      top: 50px;
      background: white;
      min-width: 200px;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 15px;
      display: none;
      z-index: 10;
    }
    
    .dropdown-content.show {
      display: block;
    }
    
    .user-email {
      font-weight: 500;
      margin-bottom: 10px;
      color: #333;
    }
    
    .logout-btn {
      padding: 8px 12px;
      width: 100%;
      background: none;
      border: none;
      color: #f44336;
      text-align: left;
      cursor: pointer;
      border-radius: 4px;
    }
    
    .logout-btn:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class NavbarComponent implements OnInit {
  showDropdown = false;
  userEmail = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit() {
    document.addEventListener('click', this.closeDropdownOnClickOutside.bind(this));
    this.updateUserEmail();
  }
  
  // Check if user is logged in
  isUserLoggedIn(): boolean {
    // This must check JWT token existence and validity
    return localStorage.getItem('access_token') !== null;
  }
  
  updateUserEmail() {
    if (this.isUserLoggedIn()) {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Parse JWT token to get user email
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          
          const decoded = JSON.parse(jsonPayload);
          this.userEmail = decoded.sub || '';
        } catch (e) {
          console.error('Error parsing token', e);
        }
      }
    }
  }
  
  getUserInitial(): string {
    if (!this.userEmail) return 'U';
    
    // Extract first letter from email
    if (this.userEmail.includes('@')) {
      return this.userEmail.split('@')[0].charAt(0).toUpperCase();
    }
    
    return this.userEmail.charAt(0).toUpperCase();
  }
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  
  closeDropdownOnClickOutside(event: any) {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown && !dropdown.contains(event.target) && this.showDropdown) {
      this.showDropdown = false;
    }
  }
  
  logoutUser() {
    // Remove JWT token
    localStorage.removeItem('access_token');
    this.showDropdown = false;
    this.router.navigate(['/']);
  }
}