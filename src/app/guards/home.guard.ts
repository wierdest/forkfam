import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

export const homeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService && authService.hasToken) {
    return true;  // Access is allowed
  } else {
    // Navigate to the login page or any other desired route
    return router.createUrlTree(['/welcome']);
  }
};