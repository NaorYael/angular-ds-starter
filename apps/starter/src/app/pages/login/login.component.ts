import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DsAlertComponent, DsButtonComponent, DsInputComponent, DsInputPasswordComponent } from '@ds/design-system';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, DsInputComponent, DsInputPasswordComponent, DsButtonComponent, DsAlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = 'demo@example.com';
  password = 'password';
  readonly loading = signal(false);
  readonly error = signal('');

  submit(): void {
    if (!this.email || !this.password) {
      this.error.set('Email and password are required.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService
      .login({ email: this.email, password: this.password })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: () => this.error.set('Login failed. Please try again.'),
      });
  }
}
