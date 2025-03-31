// src/app/components/doctor/doctor-dashboard/doctor-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <button class="logout-btn" (click)="logout()">Logout</button>
      </div>

      <div class="dashboard-content">
        <div class="profile-card">
          <h2>My Profile</h2>
          <div class="profile-info">
            <div class="doctor-details">
              <h3>Dr. {{ doctorInfo?.firstName }} {{ doctorInfo?.lastName }}</h3>
              <p class="specialization">{{ doctorInfo?.expertise }}</p>
              <p>Experience: {{ doctorInfo?.experience }} years</p>
            </div>
          </div>
        </div>

        <div class="update-section">
          <h2>Update Your Professional Description</h2>
          
          <div class="form-group">
            <label for="description">Professional Description</label>
            <textarea 
              id="description" 
              rows="6" 
              [(ngModel)]="doctorDto.description" 
              placeholder="Describe your expertise, education, and approach to patient care..."
            ></textarea>
            <p class="field-info">This description will be visible to patients on your profile</p>
          </div>
          
          <button class="save-btn" (click)="saveChanges()">Save Changes</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .dashboard-header h1 {
      color: #01579b;
      margin: 0;
    }
    
    .logout-btn {
      padding: 8px 16px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .profile-card {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-bottom: 30px;
    }
    
    .profile-card h2 {
      color: #01579b;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 10px;
    }
    
    .doctor-details h3 {
      margin: 0 0 10px 0;
      color: #01579b;
    }
    
    .specialization {
      color: #4db6ac;
      font-weight: 500;
      margin-bottom: 5px;
      text-transform: capitalize;
    }
    
    .update-section {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    
    .update-section h2 {
      color: #01579b;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 10px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #455a64;
    }
    
    .field-info {
      margin-top: 5px;
      font-size: 0.85rem;
      color: #757575;
      font-style: italic;
    }
    
    textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      resize: vertical;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.5;
    }
    
    textarea:focus {
      outline: none;
      border-color: #4db6ac;
      box-shadow: 0 0 0 2px rgba(77, 182, 172, 0.2);
    }
    
    .save-btn {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: #4db6ac;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 30px;
      transition: background-color 0.3s ease;
    }
    
    .save-btn:hover {
      background-color: #00897b;
    }
    
    @media (max-width: 768px) {
      .dashboard-container {
        padding: 15px;
      }
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  doctorInfo: any = null;
  
  doctorDto:any = {
    firstName: '',
    lastName: '',
    middleName: '',
    expertise: '',
    experience: 0,
    description: ''
  };
  
  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadDoctorProfile();
  }
  
  loadDoctorProfile(): void {
    this.doctorService.updateDoctorProfile(this.doctorDto).subscribe(
      (data) => {
        this.doctorInfo = data;
        
        // Set the doctorDto values from the profile data
        this.doctorDto = {
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          middleName: data.middleName || '',
          expertise: data.expertise || '',
          experience: data.experience || 0,
          description: data.description || ''
        };
      },
      (error) => {
        console.error('Error loading doctor profile:', error);
      }
    );
  }
  
  saveChanges(): void {
    this.doctorService.updateDoctorProfile(this.doctorDto).subscribe(
      (response) => {
        alert('Your profile has been successfully updated!');
      },
      (error) => {
        console.error('Error updating doctor information:', error);
        alert('There was an error updating your information. Please try again.');
      }
    );
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}