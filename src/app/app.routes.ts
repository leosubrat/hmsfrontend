// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DoctorsComponent } from './components/doctor/doctor.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
//   {
//     path: 'about',
//     loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
//   },
//   {
//     path: 'services',
//     loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent)
//   },
//   {
//     path: 'doctors',
//     loadComponent: () => import('./components/doctors/doctors.component').then(m => m.DoctorsComponent)
//   },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
//   {
//     path: 'auth/signup',
//     loadComponent: () => import('./components/auth/signup/signup.component').then(m => m.SignupComponent)
//   },
  {
    path: 'auth/forgot-password',
    loadComponent: () => import('./components/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'auth/signup/:role',
    component: SignupComponent
  },
  {
    path: 'doctors',
    component: DoctorsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];