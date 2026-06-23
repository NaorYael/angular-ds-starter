import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DsToastService } from '@ds/design-system';
import {
  DsGridActionsCellRenderer,
  DsGridBadgeCellRenderer,
  DsGridComponent,
} from '@ds/grid';
import { ColDef } from 'ag-grid-community';
import { delay, of, tap } from 'rxjs';

interface DemoRow {
  name: string;
  email: string;
  role: string;
  status: string;
}

const ALL_ROWS: DemoRow[] = Array.from({ length: 48 }, (_, index) => ({
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index % 3 === 0 ? 'Admin' : index % 2 === 0 ? 'Editor' : 'Viewer',
  status: index % 4 === 0 ? 'Inactive' : 'Active',
}));

@Component({
  selector: 'app-grid',
  imports: [DsGridComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  private readonly toast = inject(DsToastService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly serverPage = signal(1);
  readonly serverPageSize = 8;
  readonly serverTotal = ALL_ROWS.length;
  protected readonly Math = Math;

  readonly columnDefs: ColDef<DemoRow>[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      cellRenderer: DsGridBadgeCellRenderer,
      cellRendererParams: {
        variant: (value: unknown) => (value === 'Admin' ? 'primary' : 'neutral'),
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellRenderer: DsGridBadgeCellRenderer,
      cellRendererParams: {
        variant: (value: unknown) => (value === 'Active' ? 'success' : 'warning'),
      },
    },
    {
      headerName: 'Actions',
      flex: 1.2,
      sortable: false,
      filter: false,
      cellRenderer: DsGridActionsCellRenderer,
      cellRendererParams: {
        actions: [
          {
            label: 'Edit',
            variant: 'primary',
            onClick: (row: unknown) => this.toast.success(`Edit ${(row as DemoRow).name}`),
          },
          {
            label: 'Delete',
            variant: 'danger',
            onClick: (row: unknown) => this.toast.error(`Delete ${(row as DemoRow).name}`),
          },
        ],
      },
    },
  ];

  readonly rowData = signal<DemoRow[]>([
    { name: 'Alice Cohen', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { name: 'Bob Levi', email: 'bob@example.com', role: 'Editor', status: 'Active' },
    { name: 'Carol Mizrahi', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
    { name: 'Dan Peretz', email: 'dan@example.com', role: 'Editor', status: 'Active' },
    { name: 'Eva Rosen', email: 'eva@example.com', role: 'Admin', status: 'Active' },
  ]);

  readonly serverRows = signal<DemoRow[]>(this.sliceServerRows(1));

  sliceServerRows(page: number): DemoRow[] {
    const start = (page - 1) * this.serverPageSize;
    return ALL_ROWS.slice(start, start + this.serverPageSize);
  }

  loadServerPage(page: number): void {
    this.loading.set(true);
    this.serverPage.set(page);

    of(page)
      .pipe(
        delay(500),
        tap((nextPage) => this.serverRows.set(this.sliceServerRows(nextPage))),
        tap(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
