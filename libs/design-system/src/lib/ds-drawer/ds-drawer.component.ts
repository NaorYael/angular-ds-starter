import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

export type DsDrawerPosition = 'left' | 'right';

@Component({
  selector: 'ds-drawer',
  templateUrl: './ds-drawer.component.html',
  styleUrl: './ds-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ds-drawer-host--open]': 'visible()',
    '[class.ds-drawer-host--right]': "position() === 'right'",
  },
})
export class DsDrawerComponent {
  readonly visible = model(false);
  readonly title = input('');
  readonly position = input<DsDrawerPosition>('right');
  readonly width = input('24rem');

  readonly closed = output<void>();

  close(): void {
    this.visible.set(false);
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.close();
  }
}
