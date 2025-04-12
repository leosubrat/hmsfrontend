// appointment-form.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor/doctor.service';
import { DoctorDto } from '../../models/doctor.model';
import { UserService } from '../../services/user.service'; // Import the user service

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  @Input() doctorId: number | null = null;
  @Input() doctorName: string | null = null;
  @Input() doctorSpecialty: string | null = null;
  @Output() closeModal = new EventEmitter<void>();

  appointmentForm!: FormGroup;
  isSubmitting = false;
  submitStatus: { success: boolean; message: string } | null = null;
  minDate: string;
  timeSlots: string[] = [];
  doctors: DoctorDto[] = [];
  isLoadingUserData = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private userService: UserService // Inject user service
  ) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    // Generate time slots from 9 AM to 5 PM
    for (let hour = 9; hour <= 17; hour++) {
      const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
      const ampm = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour <= 12 ? hour : hour - 12;
      this.timeSlots.push(`${hourStr}:00 ${ampm}`);
      this.timeSlots.push(`${hourStr}:30 ${ampm}`);
    }
  }

  ngOnInit(): void {
    // Initialize form with separate first and last name fields
    this.initForm();
    
    // Load doctors
    this.loadDoctors();
    
    // Pre-select doctor if provided
    if (this.doctorId) {
      this.appointmentForm.patchValue({ doctorId: this.doctorId });
    }
    
    // Load user details to pre-populate the form
    this.loadUserDetails();
  }

  initForm(): void {
    this.appointmentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      patientEmail: ['', [Validators.required, Validators.email]],
      patientPhone: ['', Validators.required],
      doctorId: [this.doctorId, Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reasonForVisit: ['', Validators.required],
      insurance: [''],
      isNewPatient: [false]
    });
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
      }
    });
  }
  
  loadUserDetails(): void {
    this.isLoadingUserData = true;
    
    this.userService.getUserDetails().subscribe({
      next: (userData) => {
        // Pre-populate the form with user data
        this.appointmentForm.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          patientEmail: userData.email,
          patientPhone: userData.phone
        });
        this.isLoadingUserData = false;
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        this.isLoadingUserData = false;
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    // Format the appointment data
    const formData = this.appointmentForm.value;
    
    // Combine first and last name for backend if needed
    const patientName = `${formData.firstName} ${formData.lastName}`;
    
    // Get selected doctor info
    const selectedDoctor = this.doctors.find(doc => doc.doctorId === formData.doctorId);
    const doctorName = selectedDoctor ? 
      `Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}` : '';
    const doctorSpecialty = selectedDoctor?.expertise || '';
    
    // Create appointment DTO
    const appointmentDTO = {
      patientName,
      patientEmail: formData.patientEmail,
      patientPhone: formData.patientPhone,
      doctorId: formData.doctorId,
      doctorName,
      doctorSpecialty,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      reasonForVisit: formData.reasonForVisit,
      insurance: formData.insurance,
      isNewPatient: formData.isNewPatient
    };
    
    // Call your appointment service to save the appointment
    // For now, simulate a successful API call
    setTimeout(() => {
      this.submitStatus = { 
        success: true, 
        message: 'Appointment booked successfully!' 
      };
      this.isSubmitting = false;
      
      // Close the modal after 3 seconds
      setTimeout(() => {
        this.close();
      }, 3000);
    }, 1500);
  }

  close(): void {
    this.closeModal.emit();
  }
}