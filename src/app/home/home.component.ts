import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  stats = [
    { title: 'Patients', value: '1,230' },
    { title: 'Doctors', value: '45' },
    { title: 'Appointments', value: '300' }
  ];

  quickLinks = [
    { title: 'Appointments', route: '/appointments' },
    { title: 'Patient Records', route: '/patients' },
    { title: 'Billing', route: '/billing' }
  ];

  navigateTo(route: string) {
    console.log(`Navigating to ${route}`);
    // Here, you would typically use Angular's Router to navigate to the route.
  }
}
