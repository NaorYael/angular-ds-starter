import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

import { DsStepperStep } from './ds-stepper.types';

@Component({
  selector: 'ds-stepper',
  templateUrl: './ds-stepper.component.html',
  styleUrl: './ds-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsStepperComponent {
  readonly steps = input<DsStepperStep[]>([]);
  readonly value = model(0);

  isComplete(index: number): boolean {
    return index < this.value();
  }

  isActive(index: number): boolean {
    return index === this.value();
  }

  selectStep(index: number): void {
    this.value.set(index);
  }
}
