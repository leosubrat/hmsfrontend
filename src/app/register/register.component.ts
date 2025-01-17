import { Component } from '@angular/core';
import { RegisterDTO } from '../shared/model/register.dto';
import { RegisterserviceService } from './registerservice.service';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor( private registerService: RegisterserviceService) {}
  registerForm: RegisterDTO = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  onRegister(): void {
    this.registerService.onRegister(this.registerForm).subscribe({
      next: (response) => {
   
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
      },
    });
  }
}