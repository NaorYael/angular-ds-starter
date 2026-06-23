import { Injectable, effect, signal } from '@angular/core';

export type DsTheme = 'light' | 'dark';

const STORAGE_KEY = 'ds-starter-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<DsTheme>(this.readStoredTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
    });
  }

  toggle(): void {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  private readStoredTheme(): DsTheme {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
