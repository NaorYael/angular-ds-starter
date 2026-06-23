import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'ds-tab-panel',
  template: `
    @if (active()) {
      <div class="ds-tab-panel">
        <ng-content />
      </div>
    }
  `,
  styleUrl: './ds-tab-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTabPanelComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly active = signal(false);
}
