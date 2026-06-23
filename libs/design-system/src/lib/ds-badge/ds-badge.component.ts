import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type DsBadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'ds-badge',
  templateUrl: './ds-badge.component.html',
  styleUrl: './ds-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsBadgeComponent {
  readonly label = input('');
  readonly variant = input<DsBadgeVariant>('neutral');
  readonly dot = input(false);
}
