import { Component, Input, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
  export class NavbarComponent implements OnInit {
    isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  onLogout(): void {
    this.loginService.updateLoginStatus(false);
    localStorage.removeItem('accessToken');

  }
  }