import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

import { DsChartDataset, DsChartOptions, DsChartType } from './ds-chart.types';

let chartJsRegistered = false;

const DEFAULT_PALETTE = ['#2563eb', '#15803d', '#b45309', '#dc2626', '#7c3aed', '#0891b2'];

export function ensureChartJsRegistered(): void {
  if (chartJsRegistered) {
    return;
  }

  Chart.register(
    BarController,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    DoughnutController,
    ArcElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler,
  );

  chartJsRegistered = true;
}

export function resolveCssColor(variable: string, fallback: string): string {
  if (typeof document === 'undefined') {
    return fallback;
  }

  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

export function resolveChartPalette(count: number): string[] {
  return Array.from({ length: count }, (_, index) => DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]);
}

export function toChartJsDatasets(datasets: DsChartDataset[], type: DsChartType) {
  const palette = resolveChartPalette(datasets.length);

  return datasets.map((dataset, index) => {
    const color = dataset.color ?? palette[index];

    if (type === 'line') {
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor: color,
        backgroundColor: `${color}33`,
        fill: false,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 5,
      };
    }

    if (type === 'doughnut') {
      const sliceColors = resolveChartPalette(dataset.data.length);
      return {
        label: dataset.label,
        data: dataset.data,
        backgroundColor: dataset.data.map((_, sliceIndex) => sliceColors[sliceIndex]),
        borderWidth: 0,
      };
    }

    return {
      label: dataset.label,
      data: dataset.data,
      backgroundColor: color,
      borderRadius: 6,
      maxBarThickness: 42,
    };
  });
}

export function buildChartConfig(
  type: DsChartType,
  labels: string[],
  datasets: DsChartDataset[],
  options: DsChartOptions,
): { data: ChartData; options: ChartOptions } {
  const textColor = resolveCssColor('--ds-color-text-muted', '#64748b');
  const gridColor = resolveCssColor('--ds-color-border', '#e2e8f0');
  const showLegend = options.showLegend ?? (datasets.length > 1 || type === 'doughnut');

  const chartData: ChartData = {
    labels,
    datasets: toChartJsDatasets(datasets, type),
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        labels: {
          color: textColor,
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        backgroundColor: resolveCssColor('--ds-color-text', '#0f172a'),
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  if (type === 'doughnut') {
    return {
      data: chartData,
      options: {
        ...chartOptions,
        cutout: '65%',
      } as ChartOptions,
    };
  }

  chartOptions.scales = {
    x: {
      stacked: options.stacked ?? false,
      ticks: { color: textColor },
      grid: { color: gridColor },
      border: { display: false },
    },
    y: {
      stacked: options.stacked ?? false,
      beginAtZero: options.beginAtZero ?? true,
      ticks: { color: textColor },
      grid: { color: gridColor },
      border: { display: false },
    },
  };

  return { data: chartData, options: chartOptions };
}

export function createChart(
  canvas: HTMLCanvasElement,
  type: DsChartType,
  labels: string[],
  datasets: DsChartDataset[],
  options: DsChartOptions,
): Chart {
  ensureChartJsRegistered();

  const config = buildChartConfig(type, labels, datasets, options);

  return new Chart(canvas, {
    type,
    data: config.data,
    options: config.options,
  });
}

export function updateChart(
  chart: Chart,
  type: DsChartType,
  labels: string[],
  datasets: DsChartDataset[],
  options: DsChartOptions,
): void {
  const config = buildChartConfig(type, labels, datasets, options);
  chart.data = config.data;
  chart.options = config.options;
  chart.update();
}
