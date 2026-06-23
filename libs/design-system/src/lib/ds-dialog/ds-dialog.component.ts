import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'ds-dialog',
  templateUrl: './ds-dialog.component.html',
  styleUrl: './ds-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDialogComponent {
  readonly visible = input(false);
  readonly modal = input(true);
  readonly title = input('');
  readonly width = input('32rem');
  readonly closable = input(true);
  readonly showFooter = input(false);

  readonly closed = output<void>();

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    if (this.modal() && this.closable()) {
      this.close();
    }
  }

  onEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closable()) {
      this.close();
    }
  }
}
