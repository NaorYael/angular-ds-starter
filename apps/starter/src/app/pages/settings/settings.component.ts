import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsBreadcrumbsComponent, DsButtonComponent, DsCardComponent, DsInputComponent } from '@ds/design-system';

import { AuthService } from '../../core/auth/auth.service';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, DsBreadcrumbsComponent, DsButtonComponent, DsCardComponent, DsInputComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  protected readonly auth = inject(AuthService);
  protected readonly i18n = inject(I18nService);

  name = this.auth.user()?.name ?? '';
  email = this.auth.user()?.email ?? '';

  readonly breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' },
  ];

  saveProfile(): void {
    this.auth.updateProfile(this.name);
  }
}
