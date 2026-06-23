import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  viewChild,
} from '@angular/core';
import type { Chart } from 'chart.js';

import { DsChartDataset, DsChartOptions, DsChartType } from '../ds-chart.types';
import { createChart, updateChart } from '../ds-chart.utils';

@Component({
  selector: 'ds-chart',
  templateUrl: './ds-chart.component.html',
  styleUrl: './ds-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsChartComponent implements OnDestroy {
  readonly type = input<DsChartType>('bar');
  readonly labels = input<string[]>([]);
  readonly datasets = input<DsChartDataset[]>([]);
  readonly height = input('16rem');
  readonly options = input<DsChartOptions>({});
  readonly ariaLabel = input('Chart');

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  #chart: Chart | null = null;
  #isReady = false;

  constructor() {
    afterNextRender(() => {
      this.#isReady = true;
      this.renderChart();
    });

    effect(() => {
      this.type();
      this.labels();
      this.datasets();
      this.options();

      if (this.#isReady) {
        this.renderChart();
      }
    });
  }

  ngOnDestroy(): void {
    this.#chart?.destroy();
    this.#chart = null;
  }

  private renderChart(): void {
    const canvas = this.canvas()?.nativeElement;
    if (!canvas) {
      return;
    }

    const labels = this.labels();
    const datasets = this.datasets();
    const type = this.type();
    const options = this.options();

    if (!labels.length || !datasets.length) {
      this.#chart?.destroy();
      this.#chart = null;
      return;
    }

    if (this.#chart) {
      updateChart(this.#chart, type, labels, datasets, options);
      return;
    }

    this.#chart = createChart(canvas, type, labels, datasets, options);
  }
}
