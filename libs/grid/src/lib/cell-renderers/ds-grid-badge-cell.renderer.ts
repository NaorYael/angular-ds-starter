import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export type DsGridBadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export interface DsGridBadgeCellParams extends ICellRendererParams {
  variant?: DsGridBadgeVariant | ((value: unknown) => DsGridBadgeVariant);
}

@Component({
  selector: 'ds-grid-badge-cell',
  template: `
    <span class="ds-grid-badge" [class]="'ds-grid-badge--' + variant()">{{ label() }}</span>
  `,
  styles: `
    .ds-grid-badge {
      display: inline-flex;
      align-items: center;
      min-height: 1.375rem;
      padding: 0 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .ds-grid-badge--neutral { background: var(--ds-color-surface-muted); color: var(--ds-color-text-muted); }
    .ds-grid-badge--primary { background: var(--ds-color-primary-subtle); color: var(--ds-color-primary); }
    .ds-grid-badge--success { background: var(--ds-color-success-subtle); color: var(--ds-color-success); }
    .ds-grid-badge--warning { background: var(--ds-color-warning-subtle); color: var(--ds-color-warning); }
    .ds-grid-badge--danger { background: rgb(220 38 38 / 12%); color: var(--ds-color-danger); }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsGridBadgeCellRenderer implements ICellRendererAngularComp {
  protected readonly label = signal('');
  protected readonly variant = signal<DsGridBadgeVariant>('neutral');

  agInit(params: DsGridBadgeCellParams): void {
    this.refreshParams(params);
  }

  refresh(params: DsGridBadgeCellParams): boolean {
    this.refreshParams(params);
    return true;
  }

  private refreshParams(params: DsGridBadgeCellParams): void {
    const value = params.value;
    this.label.set(value === null || value === undefined ? '' : String(value));

    const variant = params.variant;
    if (typeof variant === 'function') {
      this.variant.set(variant(value));
      return;
    }

    this.variant.set(variant ?? 'neutral');
  }
}
