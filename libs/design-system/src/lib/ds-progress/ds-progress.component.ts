import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ds-progress',
  templateUrl: './ds-progress.component.html',
  styleUrl: './ds-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsProgressComponent {
  readonly value = input(0);
  readonly max = input(100);
  readonly label = input('');
  readonly showValue = input(true);

  protected readonly percentage = computed(() => {
    const max = this.max() || 100;
    const clamped = Math.min(Math.max(this.value(), 0), max);
    return Math.round((clamped / max) * 100);
  });
}
