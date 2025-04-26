// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DoctorsComponent } from './components/doctor/doctor.component';
import { DoctorDashboardComponent } from './components/doctor/doctor-dashboard/doctor.component';
import { AuthGuard } from './guards/auth.guard';
import { UserDashboardComponent } from './components/patient/user-dashboard.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { UserProfileComponent } from './components/patient/user-profile.component';
import { AppointmentListComponent } from './components/appointment-form/appointment-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { ViewPackagesComponent } from './view-packages/view-packages.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },

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
    path: 'doctor/dashboard',
    component: DoctorDashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'patient/book/appointment',
    component:AppointmentFormComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'get/all/appointment',
    component:AppointmentListComponent,
    canActivate:[AuthGuard]
  },
  { path: 'view/users', 
    component: UserListComponent,
    canActivate:[AuthGuard]

   },

  {
    path:'create/package',
    component:CreatePackageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'view/package',
    component:ViewPackagesComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'get/user/profile',
    component:UserProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];