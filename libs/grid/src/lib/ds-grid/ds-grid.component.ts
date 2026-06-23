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
  accentColor: 'var(--ds-color-primary)',
  backgroundColor: 'var(--ds-color-surface)',
  borderColor: 'var(--ds-color-border)',
  browserColorScheme: 'inherit',
  chromeBackgroundColor: 'var(--ds-color-surface-muted)',
  fontFamily: 'inherit',
  fontSize: 14,
  headerBackgroundColor: 'var(--ds-color-surface-muted)',
  headerFontWeight: 600,
  rowHoverColor: 'var(--ds-color-surface-hover)',
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
  readonly loading = input(false);
  readonly emptyMessage = input('No rows to display');

  readonly gridReady = output<GridReadyEvent<TData>>();

  protected readonly theme = dsGridTheme;

  protected readonly isEmpty = computed(() => !this.loading() && !(this.rowData()?.length ?? 0));

  protected readonly mergedGridOptions = computed<GridOptions<TData>>(() => ({
    animateRows: true,
    pagination: this.pagination(),
    paginationPageSize: this.pageSize(),
    suppressCellFocus: true,
    overlayNoRowsTemplate: `<span class="ds-grid__overlay">${this.emptyMessage()}</span>`,
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
