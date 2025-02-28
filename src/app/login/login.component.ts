import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

function equalPassword(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password === confirmPassword) {
    return null;
  }
  return { passwordsNotEqual: true };
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);

  private authService = inject(AuthService);
  isSignup = signal(false);
  formSignup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: [equalPassword] }
    ),
  });
  formLogin = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),

    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  pageToggle(isToggle: boolean) {
    this.isSignup.set(isToggle);
  }
  onLogInSubmit() {
    if (this.formLogin.invalid) {
      window.confirm('invalid form');
      return;
    }
    this.authService.logIn(
      this.formLogin.value.username || '',
      this.formLogin.value.password || ''
    );
  }
  onSignUpSubmit() {
    if (this.formSignup.invalid) {
      window.confirm('invalid form');
      return;
    }
    this.authService.signUp(
      this.formSignup.value.username || '',
      this.formSignup.value.email || '',
      this.formSignup.value.passwords?.password || '',
      this.formSignup.value.passwords?.confirmPassword || ''
    );
  }
}
