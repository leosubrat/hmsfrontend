import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './schedule-appointment.component.html',
  styleUrl: './schedule-appointment.component.css'
})
export class ScheduleAppointmentComponent {

  appointmentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      type: ['', Validators.required],
      notes: [''],
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log('Form Submitted', this.appointmentForm.value);
      alert('Appointment scheduled successfully!');
      this.appointmentForm.reset();
    }
  }
}
