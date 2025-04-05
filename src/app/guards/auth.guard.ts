// src/app/guards/auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    
    this.router.navigate(['/auth/login']);
    return false;
  }
}

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate();
};