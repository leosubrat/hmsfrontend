import { Component, Input, OnInit } from '@angular/core';
import { LoginDTO } from '../shared/model/login';
import { LoginService } from './login.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ToastModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  passwordVisible: boolean = false;
  constructor( private loginService: LoginService,private messageService:MessageService,private router:Router) {}
  loginFormModel: LoginDTO = {
    email: '',
    password: '',
    message:'',
    accessToken:''
  };
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
  onLogin(): void {
    this.loginService.onLogin(this.loginFormModel).subscribe({
      next: (response) => {
        const message = response?.message;
        this.showSuccess(message);
        this.router.navigate(['/user/dashboard']);
        localStorage.setItem("accessToken", response?.accessToken || 'loggedIn');
        this.loginService.updateLoginStatus(true);

      },
      error: (error) => {
        const errorMessage =error?.error?.message;
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
