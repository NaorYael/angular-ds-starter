import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type DsSpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-spinner',
  templateUrl: './ds-spinner.component.html',
  styleUrl: './ds-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-spinner-host',
    role: 'status',
    '[attr.aria-label]': 'label()',
  },
})
export class DsSpinnerComponent {
  readonly size = input<DsSpinnerSize>('md');
  readonly label = input('Loading');
}
