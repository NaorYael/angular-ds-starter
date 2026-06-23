import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { DsTableColumn } from './ds-table.types';

@Component({
  selector: 'ds-table',
  templateUrl: './ds-table.component.html',
  styleUrl: './ds-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTableComponent<T extends Record<string, unknown>> {
  readonly columns = input<DsTableColumn<T>[]>([]);
  readonly data = input<T[]>([]);
  readonly emptyMessage = input('No data available');
  readonly striped = input(true);

  cellValue(row: T, key: string): string {
    const value = row[key];
    return value === null || value === undefined ? '' : String(value);
  }
}
