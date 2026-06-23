import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ds-card',
  templateUrl: './ds-card.component.html',
  styleUrl: './ds-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsCardComponent {
  readonly title = input('');
  readonly subtitle = input('');
  readonly padding = input(true);
}
