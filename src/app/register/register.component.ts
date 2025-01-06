import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    NgClass,NgIf
  ],
  standalone: true
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form group with validation
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

//   // Getter methods to easily access form controls in the template
//   get firstName() {
//     return this.registerForm.get('firstName');
//   }
//
//   get lastName() {
//     return this.registerForm.get('lastName');
//   }
//
//   get email() {
//     return this.registerForm.get('email');
//   }
//
//   get password() {
//     return this.registerForm.get('password');
//   }
//
//   // Handle form submission
  onSubmit(): void {
    // @ts-ignore
    if (this.registerForm.valid) {
      // @ts-ignore
      const formData = this.registerForm.value;
      console.log('Form Submitted', formData);
      // Call the backend API to save the data
      // this.authService.register(formData).subscribe(response => { ... });
    } else {
      console.log('Form is invalid');
    }
  }
  password: any;
  email: any;
  lastName: any;
  firstName: any;
}
