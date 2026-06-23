import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type DsTagVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'ds-tag',
  templateUrl: './ds-tag.component.html',
  styleUrl: './ds-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTagComponent {
  readonly label = input('');
  readonly variant = input<DsTagVariant>('neutral');
  readonly removable = input(false);

  readonly removed = output<void>();

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit();
  }
}
