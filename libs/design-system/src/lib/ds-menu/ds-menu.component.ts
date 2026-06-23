import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { DsMenuItem } from './ds-menu.types';

@Component({
  selector: 'ds-menu',
  templateUrl: './ds-menu.component.html',
  styleUrl: './ds-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-menu-host',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class DsMenuComponent {
  readonly label = input('Open menu');
  readonly items = input<DsMenuItem[]>([]);
  readonly disabled = input(false);

  readonly itemSelected = output<DsMenuItem>();

  protected readonly open = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    this.open.update((current) => !current);
  }

  close(): void {
    this.open.set(false);
  }

  selectItem(item: DsMenuItem): void {
    if (item.disabled) {
      return;
    }

    this.itemSelected.emit(item);
    this.close();
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }

    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
