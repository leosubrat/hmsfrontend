// src/app/components/user/dashboard/user-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorListComponent } from '../doctor/doctor-list.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DoctorListComponent],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Find and book appointments with top doctors</p>
      </div>
      
      <div class="dashboard-content">
        <div class="dashboard-card quick-actions">
          <h2>Quick Actions</h2>
          <div class="action-buttons">
            <button class="action-button">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"/>
                </svg>
              </div>
              <span>Book Appointment</span>
            </button>
            
            <button class="action-button">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <span>My Records</span>
            </button>
            
            <button class="action-button">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
                  <path d="M9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                </svg>
              </div>
              <span>Appointments</span>
            </button>
            
            <button class="action-button">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <span>Profile</span>
            </button>
          </div>
        </div>
        
        <div class="dashboard-section">
          <!-- Include the Doctor List Component -->
           <app-doctor-list></app-doctor-list>
]        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .dashboard-header {
      margin-bottom: 30px;
      text-align: center;
    }
    
    .dashboard-header h1 {
      font-size: 2.5rem;
      color: #0d2437;
      margin-bottom: 10px;
    }
    
    .dashboard-header p {
      color: #757575;
      font-size: 1.1rem;
    }
    
    .dashboard-content {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    
    .dashboard-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    
    .dashboard-card h2 {
      color: #0d2437;
      font-size: 1.5rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #4db6ac;
    }
    
    .action-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
    }
    
    .action-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      background-color: #f8f9fa;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .action-button:hover {
      background-color: #e8f5e9;
      transform: translateY(-3px);
    }
    
    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: rgba(77, 182, 172, 0.2);
      margin-bottom: 10px;
      color: #4db6ac;
    }
    
    .action-button span {
      font-weight: 500;
      color: #424242;
    }
    
    .dashboard-section {
      margin-top: 20px;
    }
    
    @media (max-width: 768px) {
      .dashboard-header h1 {
        font-size: 2rem;
      }
      
      .action-buttons {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class UserDashboardComponent {
  // Component logic will go here
}