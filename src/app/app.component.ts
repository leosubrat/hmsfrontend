import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {RegisterComponent} from './register/register.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , NavbarComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed typo here
})
export class AppComponent {
  title = 'Hospitalityhub';
}
