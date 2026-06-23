import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { DsSvgIconComponent } from '../ds-svg-icon/ds-svg-icon.component';

@Component({
  selector: 'ds-bulk-actions-bar',
  standalone: true,
  imports: [TranslatePipe, DsSvgIconComponent],
  templateUrl: './ds-bulk-actions-bar.component.html',
  styleUrl: './ds-bulk-actions-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsBulkActionsBarComponent {
  readonly bulkAction = input<number>(-1);
  readonly bulkCheckboxIcon = input<string>('');
  readonly hideBulkCount = input<boolean>(false);
  readonly offsetX = input<number>(0);
  readonly offsetY = input<number>(0);

  readonly selectedCount = computed(() => this.bulkAction() ?? 0);

  readonly innerTransform = computed(() => `translateX(${this.offsetX()}px) translateY(${this.offsetY()}px)`);
}
