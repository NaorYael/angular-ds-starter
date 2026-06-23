import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DsGridComponent } from '@ds/grid';
import { ColDef } from 'ag-grid-community';

interface DemoRow {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-grid',
  imports: [DsGridComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  readonly columnDefs: ColDef<DemoRow>[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'role', headerName: 'Role', flex: 1 },
  ];

  readonly rowData = signal<DemoRow[]>([
    { name: 'Alice Cohen', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob Levi', email: 'bob@example.com', role: 'Editor' },
    { name: 'Carol Mizrahi', email: 'carol@example.com', role: 'Viewer' },
    { name: 'Dan Peretz', email: 'dan@example.com', role: 'Editor' },
    { name: 'Eva Rosen', email: 'eva@example.com', role: 'Admin' },
  ]);
}
