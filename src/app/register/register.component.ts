import { Component } from '@angular/core';
import { RegisterDTO } from '../shared/model/register.dto';
import { RegisterserviceService } from './registerservice.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ToastModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor( private registerService: RegisterserviceService,private messageService:MessageService) {}
  registerForm: RegisterDTO = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  onRegister(): void {
    this.registerService.onRegister(this.registerForm).subscribe({
      next: (response) => {
         this.showSuccess();
      },
      error: (error) => {
        this.showError();
        console.error('Error:', error);
      },
      complete: () => {
      },
    });
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data saved successfully',
      life: 3000
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error', // Error style
      summary: 'Error',
      detail: 'Something went wrong!',
      life: 3000
    });
  }
}