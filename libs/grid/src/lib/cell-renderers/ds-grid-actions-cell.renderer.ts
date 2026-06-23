import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface DsGridAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  onClick: (row: unknown) => void;
}

export interface DsGridActionsCellParams extends ICellRendererParams {
  actions?: DsGridAction[];
}

@Component({
  selector: 'ds-grid-actions-cell',
  template: `
    <div class="ds-grid-actions-cell">
      @for (action of actions(); track action.label) {
        <button
          type="button"
          class="ds-grid-actions-cell__button"
          [class]="'ds-grid-actions-cell__button--' + (action.variant ?? 'tertiary')"
          (click)="action.onClick(row())"
        >
          {{ action.label }}
        </button>
      }
    </div>
  `,
  styles: `
    .ds-grid-actions-cell {
      display: flex;
      gap: 0.375rem;
      align-items: center;
      height: 100%;
    }
    .ds-grid-actions-cell__button {
      min-height: 1.75rem;
      padding: 0 0.625rem;
      border: 1px solid var(--ds-color-border);
      border-radius: var(--ds-radius-sm);
      background: var(--ds-color-surface);
      color: var(--ds-color-text);
      font: inherit;
      font-size: 0.75rem;
      cursor: pointer;
    }
    .ds-grid-actions-cell__button--primary {
      border-color: var(--ds-color-primary);
      background: var(--ds-color-primary);
      color: var(--ds-color-on-primary);
    }
    .ds-grid-actions-cell__button--danger {
      border-color: var(--ds-color-danger);
      color: var(--ds-color-danger);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsGridActionsCellRenderer implements ICellRendererAngularComp {
  protected readonly actions = signal<DsGridAction[]>([]);
  protected readonly row = signal<unknown>(null);

  agInit(params: DsGridActionsCellParams): void {
    this.refreshParams(params);
  }

  refresh(params: DsGridActionsCellParams): boolean {
    this.refreshParams(params);
    return true;
  }

  private refreshParams(params: DsGridActionsCellParams): void {
    this.actions.set(params.actions ?? []);
    this.row.set(params.data ?? null);
  }
}
