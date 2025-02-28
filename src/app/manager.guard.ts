import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const managerGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token'); // Replace 'token' with the actual key you use

  if (token) {
    // User is logged in, redirect them to the home page or any other page

    return true;
  }
  const router = inject(Router); // Inject the Router service
  router.navigate(['/home']); // Change '/home' to your desired route
  // User is not logged in, allow access to the login page
  return false;
};
