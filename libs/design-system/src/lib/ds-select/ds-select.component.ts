import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DsSelectOption } from './ds-select.types';

@Component({
  selector: 'ds-select',
  templateUrl: './ds-select.component.html',
  styleUrl: './ds-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSelectComponent),
      multi: true,
    },
  ],
})
export class DsSelectComponent<T = string> implements ControlValueAccessor {
  readonly id = input('');
  readonly label = input('');
  readonly placeholder = input('Select an option');
  readonly options = input<DsSelectOption<T>[]>([]);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly hint = input('');
  readonly error = input('');

  readonly selectionChange = output<T | null>();

  protected readonly value = signal<T | null>(null);
  protected readonly isDisabled = signal(false);

  #onChange: (value: T | null) => void = () => undefined;
  #onTouched: () => void = () => undefined;

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onSelect(value: string): void {
    const selected = this.options().find((option) => String(option.value) === value);
    const nextValue = selected?.disabled ? this.value() : (selected?.value ?? null);

    this.value.set(nextValue ?? null);
    this.#onChange(nextValue ?? null);
    this.selectionChange.emit(nextValue ?? null);
  }

  onBlur(): void {
    this.#onTouched();
  }

  isFieldDisabled(): boolean {
    return this.disabled() || this.isDisabled();
  }

  selectedValue(): string {
    const current = this.value();
    return current === null || current === undefined ? '' : String(current);
  }
}
