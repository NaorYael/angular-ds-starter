import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type DsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type DsButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  templateUrl: './ds-button.component.html',
  styleUrl: './ds-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-button-host',
    '[class.ds-button-host--grow]': 'grow()',
  },
})
export class DsButtonComponent {
  readonly label = input<string>('');
  readonly variant = input<DsButtonVariant>('primary');
  readonly size = input<DsButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly grow = input(false);

  readonly clicked = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }
}
