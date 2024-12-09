import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like ngClass
import { UserCircle, Users, Building2, Clipboard, Calendar, FileText, Activity, CheckSquare, BarChart3, Pill, ClipboardList } from 'lucide-react'; // Import icons

@Component({
  selector: 'app-healthcare-dashboard',
  standalone: true,
  imports: [CommonModule], // Import CommonModule to use ngClass and other Angular directives
  templateUrl: './healthcare-dashboard.component.html',
  styleUrls: ['./healthcare-dashboard.component.css']
})
export class HealthcareDashboardComponent {
  activeTab = 'doctors';
  isLoading = false;
  tabs = [
    { id: 'doctors', label: 'Doctors', icon: UserCircle },
    { id: 'nurses', label: 'Nurses', icon: Users },
    { id: 'admin', label: 'Admin', icon: Building2 },
    { id: 'patients', label: 'Patients', icon: Clipboard },
  ];

  stats = [
    { label: 'Total Patients', value: '2,547', change: '+12%' },
    { label: 'Appointments', value: '185', change: '+5%' },
    { label: 'Operations', value: '24', change: '-2%' },
    { label: 'Revenue', value: '$48,574', change: '+8%' },
  ];

  appointments = [
    { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', type: 'Check-up' },
    { id: 2, patient: 'Mike Peters', time: '10:30 AM', type: 'Follow-up' },
    { id: 3, patient: 'Emma Wilson', time: '11:45 AM', type: 'Consultation' },
  ];

  medicalRecords = [
    { id: 1, patient: 'Sarah Johnson', diagnosis: 'Hypertension', date: '2023-10-15' },
    { id: 2, patient: 'Mike Peters', diagnosis: 'Diabetes Type 2', date: '2023-10-14' },
  ];

  patientVitals = [
    { id: 1, patient: 'Sarah Johnson', bp: '120/80', temp: '98.6°F', pulse: '72' },
    { id: 2, patient: 'Mike Peters', bp: '130/85', temp: '99.1°F', pulse: '78' },
  ];

  nurseTasks = [
    { id: 1, task: 'Administer medications', done: true },
    { id: 2, task: 'Change IV fluids', done: false },
    { id: 3, task: 'Patient rounds', done: false },
  ];

  staffStats = [
    { department: 'Cardiology', staff: 12, patients: 45 },
    { department: 'Neurology', staff: 8, patients: 32 },
    { department: 'Pediatrics', staff: 15, patients: 58 },
  ];

  patientPrescriptions = [
    { id: 1, medicine: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
    { id: 2, medicine: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
  ];

  renderContent() {
    switch (this.activeTab) {
      case 'doctors':
        return (
          `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg p-6 shadow-md">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">Patient Appointments</h3>
                <calendar-icon class="h-5 w-5 text-gray-500"></calendar-icon>
              </div>
              <div class="space-y-4">
                ${this.appointments.map((apt) => `
                  <div key="${apt.id}" class="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p class="font-medium">${apt.patient}</p>
                      <p class="text-sm text-gray-500">${apt.type}</p>
                    </div>
                    <span class="text-sm">${apt.time}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>`
        );
      // Similar for other cases like 'nurses', 'admin', etc.
      default:
        return '';
    }
  }
}
