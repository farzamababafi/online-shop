import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use

  if (token) {
    // User is logged in, redirect them to the home page or any other page
    const router = inject(Router); // Inject the Router service
    router.navigate(['/home']); // Change '/home' to your desired route
    return false;
  }

  // User is not logged in, allow access to the login page
  return true;
};
