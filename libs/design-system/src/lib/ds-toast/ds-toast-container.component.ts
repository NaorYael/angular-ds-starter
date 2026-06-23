import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DsToastService } from './ds-toast.service';

@Component({
  selector: 'ds-toast-container',
  templateUrl: './ds-toast-container.component.html',
  styleUrl: './ds-toast-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsToastContainerComponent {
  protected readonly toastService = inject(DsToastService);
}
