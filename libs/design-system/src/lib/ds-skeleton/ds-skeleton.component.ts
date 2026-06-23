import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type DsSkeletonVariant = 'text' | 'rect' | 'circle';

@Component({
  selector: 'ds-skeleton',
  templateUrl: './ds-skeleton.component.html',
  styleUrl: './ds-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-skeleton-host',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[class.ds-skeleton-host--circle]': 'variant() === "circle"',
    '[class.ds-skeleton-host--text]': 'variant() === "text"',
  },
})
export class DsSkeletonComponent {
  readonly variant = input<DsSkeletonVariant>('text');
  readonly width = input('100%');
  readonly height = input('1rem');
}
