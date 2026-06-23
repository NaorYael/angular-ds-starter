import { Injectable, computed, signal } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

import { AuthUser, LoginRequest, LoginResponse } from './auth.models';

const STORAGE_KEY = 'ds-starter-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #user = signal<AuthUser | null>(this.readStoredUser());
  readonly #token = signal<string | null>(this.readStoredToken());

  readonly user = this.#user.asReadonly();
  readonly token = this.#token.asReadonly();
  readonly isAuthenticated = computed(() => !!this.#token());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const response: LoginResponse = {
      token: `demo-token-${credentials.email}`,
      user: {
        email: credentials.email,
        name: credentials.email.split('@')[0] || 'User',
      },
    };

    return of(response).pipe(
      delay(400),
      tap((result) => this.persistSession(result)),
    );
  }

  logout(): void {
    this.#user.set(null);
    this.#token.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  getAuthorizationHeader(): string | null {
    const token = this.#token();
    return token ? `Bearer ${token}` : null;
  }

  private persistSession(response: LoginResponse): void {
    this.#user.set(response.user);
    this.#token.set(response.token);
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: response.user, token: response.token }),
    );
  }

  private readStoredUser(): AuthUser | null {
    return this.readStoredSession()?.user ?? null;
  }

  private readStoredToken(): string | null {
    return this.readStoredSession()?.token ?? null;
  }

  private readStoredSession(): { user: AuthUser; token: string } | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as { user: AuthUser; token: string };
    } catch {
      return null;
    }
  }
}
