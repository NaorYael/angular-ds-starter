import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'ds-tooltip',
  templateUrl: './ds-tooltip.component.html',
  styleUrl: './ds-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTooltipComponent {
  readonly text = input.required<string>();
  readonly position = input<'top' | 'bottom'>('top');

  protected readonly visible = signal(false);

  show(): void {
    this.visible.set(true);
  }

  hide(): void {
    this.visible.set(false);
  }
}
