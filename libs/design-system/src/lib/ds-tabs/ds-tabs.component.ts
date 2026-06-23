import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  input,
  model,
} from '@angular/core';

import { DsTabPanelComponent } from './ds-tab-panel.component';

@Component({
  selector: 'ds-tabs',
  templateUrl: './ds-tabs.component.html',
  styleUrl: './ds-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTabsComponent {
  readonly value = model<string>('');

  readonly panels = contentChildren(DsTabPanelComponent);

  readonly ariaLabel = input('Tabs');

  constructor() {
    afterNextRender(() => {
      const items = this.panels();
      if (!this.value() && items.length > 0) {
        this.value.set(items[0].value());
      }
    });

    effect(() => {
      const active = this.value();
      for (const panel of this.panels()) {
        panel.active.set(panel.value() === active);
      }
    });
  }

  selectTab(nextValue: string): void {
    this.value.set(nextValue);
  }

  isActive(panelValue: string): boolean {
    return this.value() === panelValue;
  }
}
