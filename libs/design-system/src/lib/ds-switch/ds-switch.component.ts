import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ds-switch',
  templateUrl: './ds-switch.component.html',
  styleUrl: './ds-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSwitchComponent),
      multi: true,
    },
  ],
})
export class DsSwitchComponent implements ControlValueAccessor {
  readonly id = input('');
  readonly label = input('');
  readonly description = input('');
  readonly disabled = input(false);

  readonly checkedChange = output<boolean>();

  protected readonly checked = signal(false);
  protected readonly isDisabled = signal(false);

  #onChange: (value: boolean) => void = () => undefined;
  #onTouched: () => void = () => undefined;

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  toggle(): void {
    if (this.isFieldDisabled()) {
      return;
    }

    const next = !this.checked();
    this.checked.set(next);
    this.#onChange(next);
    this.checkedChange.emit(next);
  }

  onBlur(): void {
    this.#onTouched();
  }

  isFieldDisabled(): boolean {
    return this.disabled() || this.isDisabled();
  }
}
