export type DsChartType = 'bar' | 'line' | 'doughnut';

export interface DsChartDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface DsChartOptions {
  showLegend?: boolean;
  beginAtZero?: boolean;
  stacked?: boolean;
}
