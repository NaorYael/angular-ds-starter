import { Injectable, computed, signal } from '@angular/core';

export type AppLocale = 'en' | 'he';

const TRANSLATIONS = {
  en: {
    'nav.components': 'Components',
    'nav.grid': 'Grid',
    'nav.charts': 'Charts',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Settings',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'app.subtitle': 'Design System ready to use',
    'theme.toggle': 'Toggle theme',
    'locale.toggle': 'עברית',
  },
  he: {
    'nav.components': 'רכיבים',
    'nav.grid': 'טבלה',
    'nav.charts': 'גרפים',
    'nav.dashboard': 'לוח בקרה',
    'nav.settings': 'הגדרות',
    'nav.login': 'התחברות',
    'nav.logout': 'התנתקות',
    'app.subtitle': 'מערכת עיצוב מוכנה לשימוש',
    'theme.toggle': 'החלפת ערכת נושא',
    'locale.toggle': 'English',
  },
} as const;

type TranslationKey = keyof (typeof TRANSLATIONS)['en'];

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly locale = signal<AppLocale>('en');

  readonly isRtl = computed(() => this.locale() === 'he');

  translate(key: TranslationKey): string {
    return TRANSLATIONS[this.locale()][key] ?? TRANSLATIONS.en[key];
  }

  toggleLocale(): void {
    this.locale.update((locale) => (locale === 'en' ? 'he' : 'en'));
    document.documentElement.lang = this.locale();
    document.documentElement.dir = this.locale() === 'he' ? 'rtl' : 'ltr';
  }
}
