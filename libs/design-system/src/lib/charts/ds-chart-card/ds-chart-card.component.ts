import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ds-chart-card',
  templateUrl: './ds-chart-card.component.html',
  styleUrl: './ds-chart-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsChartCardComponent {
  readonly title = input.required<string>();
  readonly subtitle = input('');
}
