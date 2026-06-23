import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DsAlertComponent,
  DsAvatarComponent,
  DsBadgeComponent,
  DsButtonComponent,
  DsCardComponent,
  DsCheckboxComponent,
  DsDatepickerComponent,
  DsDialogComponent,
  DsEmptyStateComponent,
  DsInputComponent,
  DsInputPasswordComponent,
  DsMenuComponent,
  DsMenuItem,
  DsRadioComponent,
  DsRadioOption,
  DsSelectComponent,
  DsSelectOption,
  DsSkeletonComponent,
  DsSpinnerComponent,
  DsSwitchComponent,
  DsTabPanelComponent,
  DsTabsComponent,
  DsTextareaComponent,
  DsToastService,
  DsTooltipComponent,
} from '@ds/design-system';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    DsButtonComponent,
    DsInputComponent,
    DsDialogComponent,
    DsSelectComponent,
    DsCheckboxComponent,
    DsBadgeComponent,
    DsCardComponent,
    DsTextareaComponent,
    DsSwitchComponent,
    DsTabsComponent,
    DsTabPanelComponent,
    DsSpinnerComponent,
    DsEmptyStateComponent,
    DsRadioComponent,
    DsInputPasswordComponent,
    DsDatepickerComponent,
    DsMenuComponent,
    DsTooltipComponent,
    DsAvatarComponent,
    DsSkeletonComponent,
    DsAlertComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly toastService = inject(DsToastService);

  email = '';
  password = '';
  notes = '';
  role = 'editor';
  plan = 'pro';
  birthDate = '';
  termsAccepted = false;
  notificationsEnabled = true;
  readonly activeTab = signal('overview');
  readonly dialogVisible = signal(false);
  readonly showEmptyItems = signal(false);
  readonly showAlerts = signal(true);
  readonly showSkeletonDemo = signal(true);
  readonly menuMessage = signal('');

  readonly roleOptions: DsSelectOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];

  readonly planOptions: DsRadioOption[] = [
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ];

  readonly menuItems: DsMenuItem[] = [
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Delete', value: 'delete', danger: true },
  ];

  openDialog(): void {
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
  }

  showSuccessToast(): void {
    this.toastService.success('Changes saved successfully.');
  }

  showErrorToast(): void {
    this.toastService.error('Something went wrong. Please try again.', {
      title: 'Save failed',
    });
  }

  onMenuSelect(item: DsMenuItem): void {
    this.menuMessage.set(`Selected: ${item.label}`);
  }
}
