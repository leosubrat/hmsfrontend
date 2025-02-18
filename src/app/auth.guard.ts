import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  if (isLoggedIn) {
    return true; 
  } else {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
// onLogout(): void {
//   localStorage.removeItem('userToken');
//   this.router.navigate(['/login']);
// }