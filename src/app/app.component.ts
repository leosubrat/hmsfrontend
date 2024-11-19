import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RegisterComponent} from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavbarComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed typo here
})
export class AppComponent {
  title = 'Hospitalityhub';
}
