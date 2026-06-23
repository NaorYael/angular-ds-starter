import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsButtonComponent, DsDialogComponent, DsInputComponent } from '@ds/design-system';

@Component({
  selector: 'app-home',
  imports: [FormsModule, DsButtonComponent, DsInputComponent, DsDialogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  email = '';
  readonly dialogVisible = signal(false);

  openDialog(): void {
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
  }
}
