import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginUser = { email:"",password:""};
  constructor(private authService: AuthService) {
  }
  onLogin(): void {
    console.log("onsubmit called");
    console.log("student info", this.loginUser);
    this.authService.loginUser(this.loginUser).subscribe(
      (response) => {
        console.log('Student data submitted successfully:', response);
      },
      (error) => {
        console.error('Error while submitting student data:', error);
      }
    );
  }
}
