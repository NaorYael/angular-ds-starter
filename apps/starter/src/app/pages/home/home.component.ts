import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DsBadgeComponent,
  DsButtonComponent,
  DsCardComponent,
  DsCheckboxComponent,
  DsDialogComponent,
  DsInputComponent,
  DsSelectComponent,
  DsSelectOption,
  DsToastService,
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly toastService = inject(DsToastService);

  email = '';
  role = 'editor';
  termsAccepted = false;
  readonly dialogVisible = signal(false);

  readonly roleOptions: DsSelectOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
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
}
