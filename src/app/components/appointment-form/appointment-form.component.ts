// appointment-form.component.ts
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor/doctor.service';
import { DoctorAvailability, DoctorDto } from '../../models/doctor.model';
import { UserService } from '../../services/user.service'; 
import { CustomDatePickerDirective } from '../custom/custom-date-picker-directives';
import { PatientAppointmentService } from '../../services/appointment/ patient-appointment.service';


@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CustomDatePickerDirective],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  @Input() doctorId: number | null = null;
  @Input() doctorName: string | null = null;
  @Input() doctorSpecialty: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('dateInput') dateInputRef!: ElementRef;

  appointmentForm!: FormGroup;
  isSubmitting = false;
  submitStatus: { success: boolean; message: string } | null = null;
  minDate: string;
  timeSlots: string[] = [];
  availableTimeSlots: string[] = [];
  doctors: DoctorDto[] = [];
  isLoadingUserData = false;
  doctorAvailabilities: DoctorAvailability[] = [];
  availableDates: string[] = [];
  unavailableDates: string[] = []; // Track unavailable dates
  selectedDate: string = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private userService: UserService,
    private appointmentService: PatientAppointmentService
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
    this.initForm();
    this.loadDoctors();
    
    if (this.doctorId) {
      this.appointmentForm.patchValue({ doctorId: this.doctorId });
      this.updateAvailableDatesForDoctor(this.doctorId);
    }
    
    this.loadUserDetails();

    // Listen for doctor selection changes
    this.appointmentForm.get('doctorId')?.valueChanges.subscribe(doctorId => {
      if (doctorId) {
        this.updateAvailableDatesForDoctor(doctorId);
        // Reset date and time when doctor changes
        this.appointmentForm.patchValue({
          appointmentDate: '',
          appointmentTime: ''
        });
      }
    });

    // Listen for date selection changes
    this.appointmentForm.get('appointmentDate')?.valueChanges.subscribe(date => {
      if (date) {
        this.selectedDate = date;
        this.updateAvailableTimeSlots();
        // Reset time when date changes
        this.appointmentForm.patchValue({
          appointmentTime: ''
        });
      }
    });
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
        this.appointmentForm.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          patientEmail: userData.email,
          patientPhone: userData.phone
        });
        
        // Store doctor availabilities for calendar
        this.doctorAvailabilities = userData.doctorAvailabilities || [];
        
        if (this.doctorId) {
          this.updateAvailableDatesForDoctor(this.doctorId);
        }
        
        this.isLoadingUserData = false;
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        this.isLoadingUserData = false;
      }
    });
  }

  updateAvailableDatesForDoctor(doctorId: number): void {
    // Filter availabilities for the selected doctor
    this.availableDates = this.doctorAvailabilities
      .filter(availability => availability.doctorId === doctorId)
      .map(availability => availability.date);
    
    // Generate unavailable dates (next 30 days excluding available dates)
    this.generateUnavailableDates();
  }

  generateUnavailableDates(): void {
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    
    this.unavailableDates = [];
    
    // Generate an array of all dates in the next 30 days
    for (let d = new Date(today); d <= thirtyDaysLater; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      
      // If this date is not in availableDates, add to unavailableDates
      if (!this.availableDates.includes(dateStr)) {
        this.unavailableDates.push(dateStr);
      }
    }
  }

 // Update this code in your component class
updateAvailableTimeSlots(): void {
  if (!this.selectedDate || !this.appointmentForm.get('doctorId')?.value) {
    this.availableTimeSlots = [];
    this.appointmentForm.get('appointmentTime')?.disable();
    return;
  }

  const doctorId = this.appointmentForm.get('doctorId')?.value;
  
  // Find the availability for the selected doctor and date
  const availability = this.doctorAvailabilities.find(
    avail => avail.doctorId === doctorId && avail.date === this.selectedDate
  );

  if (!availability) {
    this.availableTimeSlots = [];
    this.appointmentForm.get('appointmentTime')?.disable();
    return;
  }

  // Parse start and end times
  const startHour = parseInt(availability.startTime.split(':')[0]);
  const endHour = parseInt(availability.endTime.split(':')[0]);

  // Filter time slots based on doctor availability
  this.availableTimeSlots = this.timeSlots.filter(slot => {
    const slotHour = parseInt(slot.split(':')[0]);
    return slotHour >= startHour && slotHour < endHour;
  });
  
  // Enable the time control when we have available time slots
  if (this.availableTimeSlots.length > 0) {
    this.appointmentForm.get('appointmentTime')?.enable();
  } else {
    this.appointmentForm.get('appointmentTime')?.disable();
  }
}

  onDateSelected(date: string): void {
    this.selectedDate = date;
    this.updateAvailableTimeSlots();
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    const formData = this.appointmentForm.value;
    
    const patientName = `${formData.firstName} ${formData.lastName}`;
    
    const selectedDoctor = this.doctors.find(doc => doc.doctorId === formData.doctorId);
    const doctorName = selectedDoctor ? 
      `Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}` : '';
    const doctorSpecialty = selectedDoctor?.expertise || '';
    const licenseNumber = selectedDoctor?.licenseNumber || '';

    const appointmentDTO = {
      patientName,
      patientEmail: formData.patientEmail,
      patientPhone: formData.patientPhone,
      doctorId: formData.doctorId,
      doctorName,
      doctorSpecialty,
      licenseNumber,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      reasonForVisit: formData.reasonForVisit,
      insurance: formData.insurance,
      isNewPatient: formData.isNewPatient
    };
    
    // Call the appointment service to save the appointment
    this.appointmentService.savePatientAppointment(appointmentDTO).subscribe({
      next: (response) => {
        this.submitStatus = { 
          success: true, 
          message: 'Appointment booked successfully!' 
        };
        this.isSubmitting = false;
        
        // Close the modal after 3 seconds
        setTimeout(() => {
          this.close();
        }, 3000);
      },
      error: (error) => {
        console.error('Error saving appointment:', error);
        this.submitStatus = { 
          success: false, 
          message: 'Failed to book appointment. Please try again.' 
        };
        this.isSubmitting = false;
      }
    });
  }

  close(): void {
    this.closeModal.emit();
  }
  formatDisplayDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  onDateInputClick(): void {
    // This is needed to ensure the native date picker works properly
    console.log('Date input clicked');
  }
}