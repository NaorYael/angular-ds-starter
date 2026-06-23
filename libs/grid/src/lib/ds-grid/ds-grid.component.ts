import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  themeQuartz,
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const dsGridTheme = themeQuartz.withParams({
  accentColor: '#2563eb',
  backgroundColor: '#ffffff',
  borderColor: '#e2e8f0',
  browserColorScheme: 'light',
  chromeBackgroundColor: '#f8fafc',
  fontFamily: 'inherit',
  fontSize: 14,
  headerBackgroundColor: '#f8fafc',
  headerFontWeight: 600,
  rowHoverColor: '#eff6ff',
});

@Component({
  selector: 'ds-grid',
  imports: [AgGridAngular],
  templateUrl: './ds-grid.component.html',
  styleUrl: './ds-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsGridComponent<TData = unknown> {
  readonly rowData = input<TData[] | null>([]);
  readonly columnDefs = input<ColDef<TData>[]>([]);
  readonly gridOptions = input<GridOptions<TData>>({});
  readonly height = input('24rem');
  readonly pagination = input(true);
  readonly pageSize = input(10);

  readonly gridReady = output<GridReadyEvent<TData>>();

  protected readonly theme = dsGridTheme;

  protected readonly mergedGridOptions = computed<GridOptions<TData>>(() => ({
    animateRows: true,
    pagination: this.pagination(),
    paginationPageSize: this.pageSize(),
    suppressCellFocus: true,
    ...this.gridOptions(),
  }));

  #gridApi: GridApi<TData> | null = null;

  onGridReady(event: GridReadyEvent<TData>): void {
    this.#gridApi = event.api;
    this.gridReady.emit(event);
  }

  getGridApi(): GridApi<TData> | null {
    return this.#gridApi;
  }
}
