import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScheduleAppointmentComponent } from '../schedule-appointment/schedule-appointment.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-userlogindashboard',
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterLink],
  templateUrl: './userlogindashboard.component.html',
  styleUrl: './userlogindashboard.component.css'
})
export class UserlogindashboardComponent {
  activeSection: string = 'schedule-appointment';

  navigateTo(section: string): void {
    this.activeSection = section;
  }
}
