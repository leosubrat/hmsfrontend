// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

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
      
      <ul class="nav-links" [class.active]="isMenuOpen">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
        <li><a routerLink="/about" routerLinkActive="active">About</a></li>
        <li><a routerLink="/services" routerLinkActive="active">Services</a></li>
        <li><a routerLink="/doctors" routerLinkActive="active">Doctors</a></li>
        <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
        
        <!-- Mobile Auth Buttons -->
        <div class="mobile-auth">
          <button class="btn btn-login" routerLink="/auth/login">Login</button>
        </div>
      </ul>
      
      <div class="auth-buttons">
        <button class="btn btn-login" routerLink="/auth/login">Login</button>
      </div>
      
      <div class="hamburger" (click)="toggleMenu()">
        <div class="bar" [ngStyle]="getBarStyle(0)"></div>
        <div class="bar" [ngStyle]="getBarStyle(1)"></div>
        <div class="bar" [ngStyle]="getBarStyle(2)"></div>
      </div>
    </nav>
  `,
  // Styles section remains the same
  styles: [`
    /* Navbar Styles */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 5%;
      background-color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
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
      padding: 0.5rem 0;
      position: relative;
    }
    
    .nav-links a:hover, .nav-links a.active {
      color: #1e88e5;
    }
    
    .nav-links a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #1e88e5;
      transition: width 0.3s ease;
    }
    
    .nav-links a:hover::after, .nav-links a.active::after {
      width: 100%;
    }
    
    .auth-buttons {
      display: flex;
      gap: 1rem;
    }
    
    .btn {
      padding: 0.6rem 1.2rem;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      border: none;
      outline: none;
    }
    
    .btn-login {
      background-color: transparent;
      border: 1px solid #1e88e5;
      color: #1e88e5;
    }
    
    .btn-login:hover {
      background-color: rgba(30, 136, 229, 0.1);
    }
    
    .btn-signup {
      background-color: #1e88e5;
      border: 1px solid #1e88e5;
      color: white;
    }
    
    .btn-signup:hover {
      background-color: #1565c0;
    }
    
    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
    }
    
    .bar {
      width: 25px;
      height: 3px;
      background-color: #37474f;
      margin: 3px 0;
      transition: 0.4s;
      border-radius: 2px;
    }
    
    .mobile-auth {
      display: none;
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .hamburger {
        display: flex;
      }
      
      .nav-links {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: #ffffff;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        padding: 2rem 0;
      }
      
      .nav-links.active {
        left: 0;
      }
      
      .nav-links li {
        margin: 1rem 0;
      }
      
      .auth-buttons {
        display: none;
      }
      
      .mobile-auth {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 1rem auto;
        gap: 1rem;
      }
      
      .mobile-auth .btn {
        width: 100%;
        padding: 0.8rem;
        text-align: center;
      }
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  getBarStyle(index: number) {
    if (!this.isMenuOpen) {
      return {
        transform: 'rotate(0) translate(0)',
        opacity: '1'
      };
    }
    
    switch (index) {
      case 0:
        return {
          transform: 'rotate(-45deg) translate(-5px, 6px)'
        };
      case 1:
        return {
          opacity: '0'
        };
      case 2:
        return {
          transform: 'rotate(45deg) translate(-5px, -6px)'
        };
      default:
        return {};
    }
  }
}