import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DsChartCardComponent, DsChartComponent, DsChartDataset } from '@ds/design-system';

@Component({
  selector: 'app-charts',
  imports: [DsChartComponent, DsChartCardComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  readonly monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  readonly revenueDataset: DsChartDataset[] = [
    {
      label: 'Revenue',
      data: [12, 19, 14, 22, 18, 26],
      color: '#2563eb',
    },
  ];

  readonly trafficDatasets: DsChartDataset[] = [
    {
      label: 'Organic',
      data: [320, 380, 410, 460, 430, 510],
      color: '#2563eb',
    },
    {
      label: 'Paid',
      data: [180, 210, 240, 260, 250, 290],
      color: '#15803d',
    },
  ];

  readonly channelLabels = ['Email', 'Social', 'Direct', 'Referral'];
  readonly channelDataset: DsChartDataset[] = [
    {
      label: 'Traffic share',
      data: [35, 25, 22, 18],
    },
  ];
}
