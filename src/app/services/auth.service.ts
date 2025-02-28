import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/api/';
  private router = inject(Router);
  private token = signal('');
  error = signal('');
  private httpClient = inject(HttpClient);

  isAuth = this.token.asReadonly();

  logIn(username: string, password: string) {
    if (username && password)
      return this.httpClient
        .post<{ token: string }>(this.url + 'users/login', {
          username,
          password,
        })
        .pipe(
          map((res) => {
            return res.token; // Return the token directly
          })
        )
        .subscribe({
          next: (token) => {
            this.token.set(token);
            this.startTokenExpiryTimer(token);
            window.localStorage.setItem('token', token);
            this.router.navigate(['/manager']);
          },
          error: (error: Error) => {
            window.alert(error.message);
          },
        });
    else return;
  }
  signUp(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    if (username && email && password && confirmPassword)
      return this.httpClient
        .post(this.url + 'users', {
          username,
          email,
          password,
        })
        .subscribe({
          next: (res) => {
            window.location.reload();
            window.alert('The account is created');
          },
          error: (error: Error) => {
            window.alert(error.message);
          },
        });
    else return;
  }
  startTokenExpiryTimer(token: string) {
    const decodedToken: any = jwtDecode(token); // Decode the token

    if (decodedToken.exp) {
      const expiryTime = decodedToken.exp * 1000; // Convert expiry to milliseconds
      const currentTime = new Date().getTime(); // Get the current time in milliseconds
      const timeUntilExpiry = expiryTime - currentTime;

      if (timeUntilExpiry > 0) {
        // Set timeout to reset the token when it expires
        setTimeout(() => {
          this.reset(); // This function clears the token or logs the user out
        }, timeUntilExpiry);
      } else {
        // Token already expired
        this.reset(); // Clear the token immediately
      }
    }
  }
  reset() {
    this.token.set('');
    window.localStorage.clear();
  }

  constructor() {
    const token = localStorage.getItem('token');
    if (token) this.token.set(token); // Update auth state based on token presence
  }
}
