import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DsSpinnerComponent, DsToastContainerComponent } from '@ds/design-system';

import { AuthService } from './core/auth/auth.service';
import { I18nService } from './core/i18n/i18n.service';
import { LoadingService } from './core/http/loading.service';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DsToastContainerComponent, DsSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  protected readonly i18n = inject(I18nService);
  protected readonly loading = inject(LoadingService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  toggleLocale(): void {
    this.i18n.toggleLocale();
  }
}
