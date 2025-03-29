import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgbModalModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
  export class NavbarComponent implements OnInit {
    isLoggedIn: boolean = false;
    @ViewChild('logoutModal') logoutModal!: TemplateRef<any>;
    isLogOut:boolean=true;

  constructor(private loginService: LoginService,private modalService: NgbModal,private router:Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  openLogoutModal(): void {
    this.modalService.open(this.logoutModal);
  }


  onLogout(modal: any): void {
    modal.dismiss();
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.cdr.detectChanges();
  }
  }