import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { AsyncPipe } from '@angular/common';
import { DsGridComponent } from './ds-grid.component';
import { DsGridEditService, DsGridService } from './services';
import { ColDef } from 'ag-grid-community';
import { BehaviorSubject } from 'rxjs';
import { BankTransactionItem } from './types';

const columnDefs: ColDef[] = [
  {
    'headerName': 'תאריך',
    'field': 'readables.date',
    'colId': 'date',
    'sortable': true,
    'filter': false,
    'width': 130,
    'cellClass': ['ds-cell', 'ds-cell--date'],
    'flex': 1,
    'suppressSizeToFit': true,
  },
  {
    'headerName': 'חשבון',
    'field': 'readables.account',
    'colId': 'account',
    'sortable': true,
    'filter': false,
    'cellClass': ['ds-cell', 'ds-cell--account'],
    'width': 120,
    'minWidth': 110,
    'maxWidth': 180,
    'suppressSizeToFit': true,
  },
  {
    'headerName': 'פרטים',
    'field': 'readables.beneficiary',
    'colId': 'beneficiary',
    'sortable': true,
    'filter': false,
    'cellRendererParams': [
      {
        'name': 'orians_catering',
        'label': 'אוריאן קייטרינג',
        'value': 'אוריאן קייטרינג',
      },
      {
        'name': 'electric_company',
        'label': 'חברת חשמל',
        'value': 'חברת חשמל',
      },
      {
        'name': 'ariel_gas',
        'label': 'אריאל גז',
        'value': 'אריאל גז',
      },
      {
        'name': 'cellcom',
        'label': 'סלקום',
        'value': 'סלקום',
      },
      {
        'name': 'municipality',
        'label': 'עירייה',
        'value': 'עירייה',
      },
      {
        'name': 'supermarket_shuf',
        'label': 'שופרסל',
        'value': 'שופרסל',
      },
      {
        'name': 'rent_landlord',
        'label': 'משכירה – כהן בע״מ',
        'value': 'כהן בע״מ',
      },
      {
        'name': 'client_invoices',
        'label': 'לקוח — חשבונית',
        'value': 'לקוח',
      },
    ],
    'flex': 1,
    'minWidth': 160,
    'cellClass': 'ds-cell',
    'editable': true,
  },
  {
    'headerName': 'פרטים',
    'field': 'readables.details',
    'colId': 'details',
    'sortable': true,
    'filter': false,
    'cellRendererParams': [
      {
        'name': 'bank_transfer',
        'label': 'העברה בנקאית',
        'value': 'העברה בנקאית',
      },
      {
        'name': 'cc_charge',
        'label': 'חיוב כרטיס אשראי',
        'value': 'חיוב אשראי',
      },
      {
        'name': 'standing_order',
        'label': 'הוראת קבע',
        'value': 'הוראת קבע',
      },
      {
        'name': 'cash_deposit',
        'label': 'הפקדת מזומן',
        'value': 'הפקדת מזומן',
      },
      {
        'name': 'atm_withdrawal',
        'label': 'משיכת מזומן',
        'value': 'משיכת מזומן',
      },
      {
        'name': 'bank_fee',
        'label': 'עמלת בנק',
        'value': 'עמלה',
      },
      {
        'name': 'salary',
        'label': 'שכר/משכורת',
        'value': 'שכר',
      },
      {
        'name': 'refund',
        'label': 'החזר',
        'value': 'החזר',
      },
    ],
  },
  {
    'headerName': 'קטגוריה',
    'field': 'readables.category',
    'colId': 'category',
    'sortable': true,
    'filter': false,
    'flex': 1,
    'minWidth': 160,
    'editable': false,
  },
  {
    'headerName': 'סוג תשלום',
    'field': 'readables.type',
    'colId': 'paymentType',
    'sortable': true,
    'filter': false,
    'cellClass': 'ds-cell',
    'width': 140,
    'flex': 1,
    'minWidth': 140,
  },
  {
    'headerName': 'סכום חובה מקור',
    'field': 'readables.debitAmount',
    'colId': 'debitAmount',
    'sortable': true,
    'filter': false,
    'cellClass': 'ds-col--content',
    'suppressSizeToFit': true,
    'minWidth': 96,
    'maxWidth': 180,
    'headerClass': 'ds-col--content',
  },
  {
    'headerName': 'סכום זכות מקור',
    'field': 'readables.creditAmount',
    'colId': 'creditAmount',
    'sortable': true,
    'filter': false,
    'cellClass': 'ds-col--content',
    'suppressSizeToFit': true,
    'minWidth': 96,
    'maxWidth': 180,
    'headerClass': 'ds-col--content',
  },
  {
    'headerName': 'סכום מצטבר',
    'field': 'readables.runningBalance',
    'colId': 'runningBalance',
    'sortable': true,
    'filter': false,
    'cellClass': 'ds-col--content',
    'suppressSizeToFit': true,
    'minWidth': 110,
    'maxWidth': 200,
    'headerClass': 'ds-col--content',
  },
  {
    'headerName': 'התאמה',
    'field': 'match',
    'colId': 'match',
    'sortable': false,
    'filter': false,
    'cellRendererParams': [
      {
        'name': 'full',
        'label': 'התאמה מלאה',
        'value': 'full',
      },
      {
        'name': 'partial',
        'label': 'התאמה חלקית',
        'value': 'partial',
      },
      {
        'name': 'none',
        'label': 'ללא התאמה',
        'value': 'none',
      },
      {
        'name': 'flagged',
        'label': 'נדרש טיפול',
        'value': 'flagged',
      },
    ],
    'width': 74,
    'resizable': false,
    'suppressMovable': true,
    'lockPosition': true,
    'suppressSizeToFit': true,
    'headerClass': 'ds-header--match',
    'cellClass': 'ds-col--match',
  },
];

const columns = {
  'headerItems': [
    {
      'label': 'תאריך',
      'name': 'date',
      'field': 'date',
      'position': 0,
      'fieldType': 'DATE',
      'filterable': true,
      'sortable': true,
      'hidden': false,
      'forSearch': true,
      'options': [],
      'filterMethodOptions': [
        {
          'parentName': 'transaction.date',
          'version': 0,
          'value': {
            'id': 1011,
            'name': 'EQUALS_IN',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'BETWEEN_DATES',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'חשבון',
      'name': 'account',
      'field': 'account',
      'position': 1,
      'fieldType': 'STRING',
      'filterable': true,
      'sortable': true,
      'options': [],
      'hidden': false,
      'forSearch': true,
      'filterMethodOptions': [
        {
          'parentName': 'transaction.account',
          'version': 0,
          'value': {
            'id': 1012,
            'name': 'STARTS_WITH',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'STARTS_WITH',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'מוטב',
      'name': 'beneficiary',
      'field': 'beneficiary',
      'position': 2,
      'fieldType': 'STRING',
      'filterable': true,
      'sortable': true,
      hidden: false,
      forSearch: true,
      'options': [],
      'filterMethodOptions': [
        {
          'parentName': 'transaction.beneficiary',
          'version': 0,
          'value': {
            'id': 1013,
            'name': 'CONTAINS',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'CONTAINS',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'פרטים',
      'name': 'details',
      'field': 'details',
      'position': 3,
      'fieldType': 'STRING',
      'filterable': true,
      'sortable': true,
      'hidden': false,
      'forSearch': true,
      'options': [],
      'filterMethodOptions': [
        {
          'parentName': 'transaction.details',
          'version': 0,
          'value': {
            'id': 1014,
            'name': 'CONTAINS',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'CONTAINS',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'קטגוריה',
      'name': 'category',
      'field': 'category',
      'position': 0,
      'fieldType': 'CATEGORY',
      'filterable': true,
      'sortable': true,
      'hidden': false,
      'forSearch': true,
      'options': [],
      'filterMethodOptions': [
        {
          'parentName': 'transaction.category',
          'version': 0,
          'value': {
            'id': 1015,
            'name': 'IN',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'IN',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'סוג תשלום',
      'name': 'paymentType',
      'field': 'paymentType',
      'position': 4,
      'fieldType': 'STRING',
      'filterable': true,
      'sortable': true,
      'options': [],
      'hidden': false,
      'forSearch': true,
      'filterMethodOptions': [
        {
          'parentName': 'transaction.paymentType',
          'version': 0,
          'value': {
            'id': 1016,
            'name': 'EQUALS',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'EQUALS',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'סכום חובה מקור',
      'name': 'debitAmount',
      'field': 'debitAmount',
      'position': 5,
      'fieldType': 'CURRENCY',
      'filterable': true,
      'sortable': true,
      'hidden': false,
      'forSearch': true,
      'options': [],
      'filterMethodOptions': [
        {
          'parentName': 'transaction.debitAmount',
          'version': 0,
          'value': {
            'id': 1017,
            'name': 'GREATER_THAN',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'GREATER_THAN',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'סכום זכות מקור',
      'name': 'creditAmount',
      'field': 'creditAmount',
      'position': 6,
      'fieldType': 'CURRENCY',
      'filterable': true,
      'sortable': true,
      'hidden': false,
      'forSearch': true,
      'options': [],
      'filterMethodOptions': [
        {
          'parentName': 'transaction.creditAmount',
          'version': 0,
          'value': {
            'id': 1018,
            'name': 'LESS_THAN',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'LESS_THAN',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'סכום מצטבר',
      'name': 'runningBalance',
      'field': 'runningBalance',
      'position': 7,
      'fieldType': 'CURRENCY',
      'filterable': true,
      'sortable': false,
      'hidden': false,
      'forSearch': true,
      'options': [],
      'filterMethodOptions': [
        {
          'parentName': 'transaction.runningBalance',
          'version': 0,
          'value': {
            'id': 1019,
            'name': 'RANGE',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'RANGE',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
    {
      'label': 'התאמה',
      'name': 'match',
      'field': 'match',
      'position': 8,
      'fieldType': 'MATCH',
      'filterable': false,
      'sortable': false,
      'hidden': false,
      'forSearch': true,
      'options': [],
      'filterMethodOptions': [
        {
          'parentName': 'transaction.match',
          'version': 0,
          'value': {
            'id': 1020,
            'name': 'EQUALS',
            'parentId': 6,
            'parentName': 'FilterMethodOptionEnumEntity',
            'version': 0,
            'active': null,
            'value': 'EQUALS',
          },
        },
      ],
      'isLazyOption': false,
      'multiFilter': false,
    },
  ],
};

const sampleRowData: BankTransactionItem[] = [
  {
    'id': '68e78e48823d5367ec685f69',
    'metadata': {
      status: 'APPROVED',
      exported: true,
      revision: 0,
    },
    'readables': {
      'organizationId': '68e78b1c9ae5b72fb477cfb3',
      'iban': {
        'iban': 'IL330204410000000247673',
        'currency': 'ILS',
      },
      'account': 'IL330204410000000247673',
      'beneficiary': 'אוריאן קייטרינג',
      'details': 'העברה בנקאית',
      'category': 'מזון והסעדה',
      'type': 'חיוב',
      'amount': -13932.5,
      'debitAmount': 13932.5,
      'creditAmount': 0,
      'runningBalance': 50000,
      'description': 'יתרה נוכחית נכון ל -',
      'date': '2025-10-09',
      'markedTemporary': false,
      'revision': 1,
    },
    'match': 'full',
  },
  {
    'id': '68e78e48823d5367ec685f70',
    'metadata': {
      status: 'APPROVED',
      exported: false,
      revision: 0,
    },
    'readables': {
      'organizationId': '68e78b1c9ae5b72fb477cfb3',
      'iban': {
        'iban': 'IL330204410000000247673',
        'currency': 'ILS',
      },
      'account': 'IL330204410000000247673',
      'beneficiary': 'חברת חשמל',
      'details': 'חיוב כרטיס אשראי',
      'category': 'שירותים',
      'type': 'חיוב',
      'amount': -450.5,
      'debitAmount': 450.5,
      'creditAmount': 0,
      'runningBalance': 49549.5,
      'description': 'חיוב חודשי',
      'date': '2025-10-08',
      'markedTemporary': false,
      'revision': 1,
    },
    'match': 'partial',
  },
  {
    'id': '68e78e48823d5367ec685f71',
    'metadata': {
      status: 'APPROVED',
      exported: true,
      revision: 0,
    },
    'readables': {
      'organizationId': '68e78b1c9ae5b72fb477cfb3',
      'iban': {
        'iban': 'IL330204410000000247673',
        'currency': 'ILS',
      },
      'account': 'IL330204410000000247673',
      'beneficiary': 'לקוח',
      'details': 'לקוח — חשבונית',
      'category': 'הכנסות',
      'type': 'זכות',
      'amount': 10000,
      'debitAmount': 0,
      'creditAmount': 10000,
      'runningBalance': 59549.5,
      'description': 'תשלום חשבונית #12345',
      'date': '2025-10-07',
      'markedTemporary': false,
      'revision': 1,
    },
    'match': 'full',
  },
];

const largeDataset = Array(100)
  .fill(sampleRowData[0])
  .map((item, index) => ({
    ...item,
    readables: { ...item.readables, details: item.readables.details + ` - ${index}` },
    id: `large-dataset-${index}`,
  }));
const currentPage$ = new BehaviorSubject(1);
const pageSize = 25;

const largeDatasetRowData$ = new BehaviorSubject(largeDataset.slice(0, pageSize));
currentPage$.subscribe(page => {
  largeDatasetRowData$.next(largeDataset.slice((page - 1) * pageSize, page * pageSize));
});

const meta: Meta<DsGridComponent<BankTransactionItem>> = {
  title: 'Grid/Bizibox Grid',
  component: DsGridComponent,
  decorators: [
    moduleMetadata({
      imports: [DsGridComponent, AsyncPipe],
      providers: [DsGridEditService],
    }),
    applicationConfig({
      providers: [
        {
          provide: DsGridService,
          useFactory: () => {
            const service = new DsGridService();
            service.setColDefs(columnDefs);
            service.setColumns(columns);
            service.commands$.subscribe(command => {
              currentPage$.next(command.payload.pageIndex);
            });
            return service;
          },
        },
      ],
    }),
  ],
  argTypes: {
    rowData: {
      control: { type: 'object' },
      description: 'Array of row data to display in the grid',
    },
    columnDefs: {
      control: { type: 'object' },
      description: 'Column definitions for the grid',
    },
    pageTotal: {
      control: { type: 'number' },
      description: 'Total number of items for pagination',
    },
    hidePagination: {
      control: { type: 'boolean' },
      description: 'Hide pagination controls',
    },
    useSelection: {
      control: { type: 'boolean' },
      description: 'Enable row selection',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<DsGridComponent<BankTransactionItem>>;

const componentContainerStyles = [
  `
    .component-container {
      display: flex;
      flex-direction: column;
      height: 600px;
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
    }
  `,
];

export const Default: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: columnDefs,
    hidePagination: false,
    useSelection: false,
    pageTotal: 1,
  },
  render: args => {
    return {
      props: {
        ...args,
      },
      styles: componentContainerStyles,
      template: `
        <div class="component-container">
          <ds-grid
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [hidePagination]="hidePagination"
            [useSelection]="useSelection"
            [pageTotal]="pageTotal"
          ></ds-grid>
        </div>
      `,
    };
  },
};

export const WithSelection: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: columnDefs,
    hidePagination: false,
    useSelection: true,
    pageTotal: 1,
  },
  render: args => {
    return {
      props: {
        ...args,
      },
      styles: componentContainerStyles,
      template: `
        <div class="component-container">
          <ds-grid
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [hidePagination]="hidePagination"
            [useSelection]="useSelection"
            [pageTotal]="pageTotal"
          ></ds-grid>
        </div>
      `,
    };
  },
};

export const WithoutPagination: Story = {
  args: {
    rowData: largeDataset,
    columnDefs: columnDefs,
    hidePagination: true,
    useSelection: false,
    pageTotal: 4,
  },
  render: args => {
    return {
      props: {
        ...args,
      },
      styles: componentContainerStyles,
      template: `
        <div class="component-container">
          <ds-grid
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [hidePagination]="hidePagination"
            [useSelection]="useSelection"
            [pageTotal]="pageTotal"
          ></ds-grid>
        </div>
      `,
    };
  },
};

export const LargeDataset: Story = {
  args: {
    columnDefs: columnDefs,
    hidePagination: false,
    useSelection: false,
    pageTotal: 100,
  },
  render: args => {
    return {
      props: {
        ...args,
        rowData$: largeDatasetRowData$,
      },
      styles: componentContainerStyles,
      template: `
        <div class="component-container">
          <ds-grid
            [rowData]="(rowData$ | async) || []"
            [columnDefs]="columnDefs"
            [useSelection]="useSelection"
            [pageTotal]="pageTotal"
          ></ds-grid>
        </div>
      `,
    };
  },
};

export const EmptyState: Story = {
  args: {
    rowData: [],
    hidePagination: false,
    useSelection: false,
    pageTotal: 1,
  },
  render: args => {
    return {
      props: {
        ...args,
      },
      styles: componentContainerStyles,
      template: `
        <div class="component-container">
          <ds-grid
            [rowData]="rowData"
            [hidePagination]="hidePagination"
            [useSelection]="useSelection"
            [pageTotal]="pageTotal"
          ></ds-grid>
        </div>
      `,
    };
  },
};

export const LTR: Story = {
  args: {
    rowData: sampleRowData,
    columnDefs: columnDefs,
    hidePagination: false,
    useSelection: false,
    pageTotal: 1,
  },
  render: args => {
    return {
      props: {
        ...args,
      },
      styles: componentContainerStyles,
      template: `
        <div class="component-container">
          <ds-grid
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [hidePagination]="hidePagination"
            [useSelection]="useSelection"
            [pageTotal]="pageTotal"
          ></ds-grid>
        </div>
      `,
    };
  },
};
