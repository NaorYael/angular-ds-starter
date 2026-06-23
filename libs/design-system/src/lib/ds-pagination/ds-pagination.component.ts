import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'ds-pagination',
  templateUrl: './ds-pagination.component.html',
  styleUrl: './ds-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsPaginationComponent {
  readonly page = model(1);
  readonly pageSize = input(10);
  readonly total = input(0);

  readonly pageChange = output<number>();

  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));

  protected readonly rangeLabel = computed(() => {
    if (!this.total()) {
      return '0 results';
    }

    const start = (this.page() - 1) * this.pageSize() + 1;
    const end = Math.min(this.page() * this.pageSize(), this.total());
    return `${start}–${end} of ${this.total()}`;
  });

  goToPage(nextPage: number): void {
    const clamped = Math.min(Math.max(nextPage, 1), this.totalPages());
    if (clamped === this.page()) {
      return;
    }

    this.page.set(clamped);
    this.pageChange.emit(clamped);
  }
}
