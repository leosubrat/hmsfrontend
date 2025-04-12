// appointment-form.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PatientAppointmentService } from '../../services/appointment/ patient-appointment.service';
import { PatientAppointmentDTO } from '../../models/patientAppointmentDTO';

// export interface PatientAppointmentDTO {
//   patientName: string;
//   patientEmail: string;
//   patientPhone: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   reasonForVisit: string;
//   insurance: string;
//   isNewPatient: boolean;
//   doctorId: number;
//   doctorName: string;
//   doctorSpecialty: string;
//   doctorLiscenceNo:string;
// }

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  @Input() doctorId!: number;
  @Input() doctorName!: string;
  @Input() doctorSpecialty!: string;
  @Output() closeModal = new EventEmitter<void>();

  appointmentForm: FormGroup;
  isSubmitting = false;
  submitStatus: { success: boolean; message: string } | null = null;
  
  timeSlots: string[] = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient,private appointmentService:PatientAppointmentService) {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      patientEmail: ['', [Validators.required, Validators.email]],
      patientPhone: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reasonForVisit: ['', Validators.required],
      insurance: [''],
      licenseNumber:['',Validators.required],  // Changed to match HTML
      isNewPatient: [false]
    });
  }

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const appointmentDTO: PatientAppointmentDTO = {
      ...this.appointmentForm.value,
      doctorId: this.doctorId,
      doctorName: this.doctorName,
      doctorSpecialty: this.doctorSpecialty
    };

    this.appointmentService.savePatientAppointment(appointmentDTO)
      .subscribe({
        next: () => {
          this.submitStatus = { success: true, message: 'Appointment booked successfully!' };
          setTimeout(() => {
            this.submitStatus = null;
            this.closeModal.emit();
          }, 3000);
        },
        error: (error) => {
          console.error('Error booking appointment', error);
          this.submitStatus = { success: false, message: 'Failed to book appointment. Please try again.' };
          this.isSubmitting = false;
        }
      });
  }

  close(): void {
    this.closeModal.emit();
  }
}