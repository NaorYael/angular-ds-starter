import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type DsAlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'ds-alert',
  templateUrl: './ds-alert.component.html',
  styleUrl: './ds-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"ds-alert ds-alert--" + variant()',
    role: 'alert',
  },
})
export class DsAlertComponent {
  readonly title = input('');
  readonly message = input.required<string>();
  readonly variant = input<DsAlertVariant>('info');
  readonly dismissible = input(false);

  readonly dismissed = output<void>();

  dismiss(): void {
    this.dismissed.emit();
  }
}
