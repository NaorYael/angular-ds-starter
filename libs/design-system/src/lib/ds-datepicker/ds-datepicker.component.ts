import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ds-datepicker',
  imports: [FormsModule],
  templateUrl: './ds-datepicker.component.html',
  styleUrl: './ds-datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsDatepickerComponent),
      multi: true,
    },
  ],
})
export class DsDatepickerComponent implements ControlValueAccessor {
  readonly id = input('');
  readonly label = input('');
  readonly disabled = input(false);
  readonly required = input(false);
  readonly hint = input('');
  readonly error = input('');
  readonly min = input('');
  readonly max = input('');

  readonly blurred = output<void>();

  protected readonly value = signal('');
  protected readonly isDisabled = signal(false);

  #onChange: (value: string) => void = () => undefined;
  #onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInput(value: string): void {
    this.value.set(value);
    this.#onChange(value);
  }

  onBlur(): void {
    this.#onTouched();
    this.blurred.emit();
  }

  isFieldDisabled(): boolean {
    return this.disabled() || this.isDisabled();
  }
}
