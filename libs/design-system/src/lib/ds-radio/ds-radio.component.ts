import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DsRadioOption } from './ds-radio.types';

@Component({
  selector: 'ds-radio',
  templateUrl: './ds-radio.component.html',
  styleUrl: './ds-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsRadioComponent),
      multi: true,
    },
  ],
})
export class DsRadioComponent<T = string> implements ControlValueAccessor {
  readonly id = input('');
  readonly label = input('');
  readonly options = input<DsRadioOption<T>[]>([]);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly hint = input('');
  readonly error = input('');
  readonly layout = input<'vertical' | 'horizontal'>('vertical');

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

  selectOption(option: DsRadioOption<T>): void {
    if (this.isFieldDisabled() || option.disabled) {
      return;
    }

    this.value.set(option.value);
    this.#onChange(option.value);
    this.selectionChange.emit(option.value);
  }

  isSelected(option: DsRadioOption<T>): boolean {
    return this.value() === option.value;
  }

  onBlur(): void {
    this.#onTouched();
  }

  isFieldDisabled(): boolean {
    return this.disabled() || this.isDisabled();
  }

  optionId(option: DsRadioOption<T>, index: number): string {
    return `${this.id() || 'ds-radio'}-${index}`;
  }
}
