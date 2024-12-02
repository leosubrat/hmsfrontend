import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    FormsModule
  ],
  standalone: true
})
export class RegisterComponent {
  user = { firstName: '', lastName: '',email:"",password:""};
  constructor(private appService: AuthService) {
    console.log("heyyyy")
  }
  onSubmit(): void {
    this.appService.registerUser(this.user).subscribe(
      (response) => {
        console.log('Student data submitted successfully:', response);
      },
      (error) => {
        console.error('Error while submitting student data:', error);
      }
    );
  }
}
