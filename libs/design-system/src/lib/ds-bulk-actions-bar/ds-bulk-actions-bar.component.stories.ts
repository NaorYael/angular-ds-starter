import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';
import { DsBulkActionsBarComponent } from './ds-bulk-actions-bar.component';
import { DsButtonComponent } from '../ds-button/ds-button.component';

type StoryArgs = {
  selectedCount: number;
  disabledAll: boolean;
};

const meta: Meta<StoryArgs> = {
  component: DsBulkActionsBarComponent,
  title: 'Actions/Bulk Actions Bar',
  decorators: [
    moduleMetadata({
      imports: [DsBulkActionsBarComponent, DsButtonComponent],
    }),
  ],
  argTypes: {
    selectedCount: { control: 'number', description: 'Number of selected records' },
    disabledAll: { control: 'boolean', description: 'Disable all actions' },
  },
  args: {
    selectedCount: 22,
    disabledAll: false,
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: (args: StoryArgs) => {
    const selectedCount = signal(args.selectedCount);
    const lastAction = signal<string | null>(null);

    return {
      props: {
        selectedCount,
        lastAction,
        disabledAll: args.disabledAll,
        onCopy: () => lastAction.set('copy'),
        onMoveToFolder: () => lastAction.set('moveToFolder'),
        onMoveToOther: () => lastAction.set('moveToOther'),
        onDelete: () => lastAction.set('delete'),
        onArchive: () => lastAction.set('archive'),
        onCreateFile: () => lastAction.set('createFile'),
      },
      template: `
        <div style="padding: 1rem; background: #1a1d21; min-height: 120px;">
          <ds-bulk-actions-bar [bulkAction]="selectedCount()">
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="שכפול" iconStart="assets/svg/exchange.svg" [disabled]="disabledAll" (clickAction)="onCopy()" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="העברה לתיקיה אחרת" iconStart="assets/svg/forward.svg" [disabled]="disabledAll" (clickAction)="onMoveToFolder()" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="העברה למנה אחרת" iconStart="assets/svg/forward.svg" [disabled]="disabledAll" (clickAction)="onMoveToOther()" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="מחיקה" iconStart="assets/svg/actions-delete.svg" [disabled]="disabledAll" (clickAction)="onDelete()" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="אילקסום מרובה" iconStart="assets/svg/double-right.svg" [disabled]="disabledAll" (clickAction)="onArchive()" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="צור קובץ" iconStart="assets/svg/blank.svg" [disabled]="disabledAll" (clickAction)="onCreateFile()" />
          </ds-bulk-actions-bar>
          @if (lastAction()) {
            <p style="color: #94a3b8; margin-top: 1rem; font-size: 0.875rem;">
              Last action: {{ lastAction() }}
            </p>
          }
        </div>
      `,
    };
  },
};

export const ManyActionsOverflow: Story = {
  render: (args: StoryArgs) => {
    const selectedCount = signal(args.selectedCount);

    return {
      props: { selectedCount },
      template: `
        <div style="padding: 1rem; background: #1a1d21; max-width: 500px;">
          <ds-bulk-actions-bar [bulkAction]="selectedCount()">
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="שכפול" iconStart="assets/svg/exchange.svg" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="העברה לתיקיה אחרת" iconStart="assets/svg/forward.svg" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="העברה למנה אחרת" iconStart="assets/svg/forward.svg" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="מחיקה" iconStart="assets/svg/actions-delete.svg" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="אילקסום מרובה" iconStart="assets/svg/double-right.svg" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="צור קובץ" iconStart="assets/svg/blank.svg" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="שחזור" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="ייצוא" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="הדפסה" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="שיתוף" />
          </ds-bulk-actions-bar>
        </div>
      `,
    };
  },
};

export const Disabled: Story = {
  args: {
    selectedCount: 5,
    disabledAll: true,
  },
  render: (args: StoryArgs) => {
    const selectedCount = signal(args.selectedCount);

    return {
      props: {
        selectedCount,
        disabledAll: args.disabledAll,
      },
      template: `
        <div style="padding: 1rem; background: #1a1d21;">
          <ds-bulk-actions-bar [bulkAction]="selectedCount()">
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="שכפול" iconStart="assets/svg/exchange.svg" [disabled]="disabledAll" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="העברה לתיקיה אחרת" iconStart="assets/svg/forward.svg" [disabled]="disabledAll" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="העברה למנה אחרת" iconStart="assets/svg/forward.svg" [disabled]="disabledAll" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="מחיקה" iconStart="assets/svg/actions-delete.svg" [disabled]="disabledAll" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="אילקסום מרובה" iconStart="assets/svg/double-right.svg" [disabled]="disabledAll" />
            <ds-button variant="secondary_white" size="small" [checkedMode]="false" label="צור קובץ" iconStart="assets/svg/blank.svg" [disabled]="disabledAll" />
          </ds-bulk-actions-bar>
        </div>
      `,
    };
  },
};
