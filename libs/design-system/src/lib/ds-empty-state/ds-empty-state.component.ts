import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ds-empty-state',
  templateUrl: './ds-empty-state.component.html',
  styleUrl: './ds-empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsEmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly icon = input('📭');
}
