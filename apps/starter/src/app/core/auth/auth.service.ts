import { Injectable, computed, signal } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

import { AuthUser, LoginRequest, LoginResponse } from './auth.models';

const STORAGE_KEY = 'ds-starter-auth';

interface StoredSession {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #user = signal<AuthUser | null>(this.readStoredUser());
  readonly #token = signal<string | null>(this.readStoredToken());
  readonly #refreshToken = signal<string | null>(this.readStoredRefreshToken());

  readonly user = this.#user.asReadonly();
  readonly token = this.#token.asReadonly();
  readonly refreshToken = this.#refreshToken.asReadonly();
  readonly isAuthenticated = computed(() => !!this.#token());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const response: LoginResponse = {
      token: `demo-token-${credentials.email}`,
      refreshToken: `demo-refresh-${credentials.email}`,
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

  refreshSession(): Observable<LoginResponse | null> {
    const refreshToken = this.#refreshToken();
    if (!refreshToken || !this.#user()) {
      return of(null);
    }

    const user = this.#user()!;
    const response: LoginResponse = {
      token: `demo-token-refreshed-${user.email}`,
      refreshToken: `demo-refresh-refreshed-${user.email}`,
      user,
    };

    return of(response).pipe(
      delay(300),
      tap((result) => this.persistSession(result)),
    );
  }

  updateProfile(name: string): void {
    const user = this.#user();
    if (!user) {
      return;
    }

    const nextUser = { ...user, name };
    this.#user.set(nextUser);
    this.persistStoredSession({
      user: nextUser,
      token: this.#token() ?? '',
      refreshToken: this.#refreshToken() ?? '',
    });
  }

  logout(): void {
    this.#user.set(null);
    this.#token.set(null);
    this.#refreshToken.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  getAuthorizationHeader(): string | null {
    const token = this.#token();
    return token ? `Bearer ${token}` : null;
  }

  private persistSession(response: LoginResponse): void {
    this.#user.set(response.user);
    this.#token.set(response.token);
    this.#refreshToken.set(response.refreshToken);
    this.persistStoredSession({
      user: response.user,
      token: response.token,
      refreshToken: response.refreshToken,
    });
  }

  private persistStoredSession(session: StoredSession): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  private readStoredUser(): AuthUser | null {
    return this.readStoredSession()?.user ?? null;
  }

  private readStoredToken(): string | null {
    return this.readStoredSession()?.token ?? null;
  }

  private readStoredRefreshToken(): string | null {
    return this.readStoredSession()?.refreshToken ?? null;
  }

  private readStoredSession(): StoredSession | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as StoredSession;
    } catch {
      return null;
    }
  }
}
