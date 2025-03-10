import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserlogindashboardComponent } from './userlogindashboard/userlogindashboard.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { authGuard } from './auth.guard';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'nav',component:NavbarComponent},
  {
    path: 'user/dashboard',
    component: UserlogindashboardComponent,
    canActivate: [authGuard]
  },  
  {path:'schedule-form',component:ScheduleAppointmentComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
