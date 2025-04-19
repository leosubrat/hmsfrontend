// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-navbar *ngIf="showNavbar"></app-navbar>
      <main class="content" [ngClass]="{'no-padding': !showNavbar}">
        <router-outlet></router-outlet>
      </main>
      <!-- <app-footer></app-footer> -->
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f5f8fa;
    }

    .content {
      flex: 1;
      padding: 20px;
    }
    
    .no-padding {
      padding: 0;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'HospitalityHub';
  showNavbar = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      this.showNavbar = !this.isUserDashboardRoute(url);
    });
  }
  
  private isUserDashboardRoute(url: string): boolean {
    const userDashboardRoutes = [
      '/user/dashboard',
      '/get/user/profile',
      '/get/all/appointment',
      '/patient/book/appointment',
      '/doctor/dashboard',
      '/admin/dashboard'
    ];
    
    // Check if the current URL matches any of these routes
    return userDashboardRoutes.some(route => url.startsWith(route));
  }
}