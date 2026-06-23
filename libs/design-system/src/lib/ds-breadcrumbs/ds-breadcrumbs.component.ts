import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DsBreadcrumbItem } from './ds-breadcrumbs.types';

@Component({
  selector: 'ds-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './ds-breadcrumbs.component.html',
  styleUrl: './ds-breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsBreadcrumbsComponent {
  readonly items = input<DsBreadcrumbItem[]>([]);
}
