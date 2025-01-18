import { Component } from '@angular/core';
import { RegisterDTO } from '../shared/model/register.dto';
import { RegisterserviceService } from './registerservice.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ToastModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  passwordVisible: boolean = false;
  constructor( private registerService: RegisterserviceService,private messageService:MessageService) {}
  registerFormModel: RegisterDTO = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    message:'',
  };
  onRegister(): void {
    this.registerService.onRegister(this.registerFormModel).subscribe({
      next: (response) => {
        const message = response?.message;
        this.showSuccess(message);
      },
      error: (error) => {
        const errorMessage =
          error?.error?.message;
        this.showError(errorMessage);
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request completed.');
      },
    });
  }
  showSuccess(message:string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  }
  showError(errorMessage:string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
      life: 3000
    });
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}