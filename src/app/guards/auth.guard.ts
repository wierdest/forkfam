import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService && authService.hasToken) {
    return true;  // Access is allowed
  } else {
    // Navigate to the login page or any other desired route
    return router.createUrlTree(['/welcome']);
  }
};
