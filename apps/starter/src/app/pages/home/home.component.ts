import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DsAlertComponent,
  DsAutocompleteComponent,
  DsAutocompleteOption,
  DsAvatarComponent,
  DsBadgeComponent,
  DsBreadcrumbsComponent,
  DsButtonComponent,
  DsCardComponent,
  DsCheckboxComponent,
  DsDatepickerComponent,
  DsDialogComponent,
  DsDrawerComponent,
  DsEmptyStateComponent,
  DsFileUploadComponent,
  DsInputComponent,
  DsInputPasswordComponent,
  DsMenuComponent,
  DsMenuItem,
  DsMultiSelectComponent,
  DsPaginationComponent,
  DsProgressComponent,
  DsRadioComponent,
  DsRadioOption,
  DsSelectComponent,
  DsSelectOption,
  DsSkeletonComponent,
  DsSpinnerComponent,
  DsStepperComponent,
  DsStepperStep,
  DsSwitchComponent,
  DsTabPanelComponent,
  DsTableColumn,
  DsTableComponent,
  DsTabsComponent,
  DsTagComponent,
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
    DsTagComponent,
    DsProgressComponent,
    DsBreadcrumbsComponent,
    DsStepperComponent,
    DsPaginationComponent,
    DsTableComponent,
    DsDrawerComponent,
    DsAutocompleteComponent,
    DsMultiSelectComponent,
    DsFileUploadComponent,
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
  city = '';
  skills: string[] = ['angular'];
  termsAccepted = false;
  notificationsEnabled = true;
  readonly uploadMessage = signal('');
  readonly activeTab = signal('overview');
  readonly dialogVisible = signal(false);
  readonly drawerVisible = signal(false);
  readonly showEmptyItems = signal(false);
  readonly showAlerts = signal(true);
  readonly showSkeletonDemo = signal(true);
  readonly menuMessage = signal('');
  readonly stepIndex = signal(0);
  readonly tablePage = signal(1);
  readonly tags = signal(['Angular', 'Nx', 'TypeScript']);

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

  readonly cityOptions: DsAutocompleteOption[] = [
    { label: 'Tel Aviv', value: 'tel-aviv' },
    { label: 'Jerusalem', value: 'jerusalem' },
    { label: 'Haifa', value: 'haifa' },
    { label: 'Beer Sheva', value: 'beer-sheva' },
  ];

  readonly skillOptions: DsSelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Node.js', value: 'node' },
  ];

  readonly stepperSteps: DsStepperStep[] = [
    { label: 'Account', description: 'Basic details' },
    { label: 'Preferences', description: 'Notifications' },
    { label: 'Review', description: 'Confirm and submit' },
  ];

  readonly tableColumns: DsTableColumn[] = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status', align: 'end' },
  ];

  readonly tableData = [
    { name: 'Alice Cohen', role: 'Admin', status: 'Active' },
    { name: 'Bob Levi', role: 'Editor', status: 'Active' },
    { name: 'Carol Mizrahi', role: 'Viewer', status: 'Pending' },
  ];

  readonly allTableData = Array.from({ length: 23 }, (_, index) => ({
    name: `User ${index + 1}`,
    role: index % 2 === 0 ? 'Editor' : 'Viewer',
    status: index % 3 === 0 ? 'Pending' : 'Active',
  }));

  readonly pagedTableData = () => {
    const start = (this.tablePage() - 1) * 5;
    return this.allTableData.slice(start, start + 5);
  };

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

  removeTag(tag: string): void {
    this.tags.update((items) => items.filter((item) => item !== tag));
  }

  onFilesSelected(files: File[]): void {
    this.uploadMessage.set(files.map((file) => file.name).join(', '));
  }
}
