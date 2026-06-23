import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DsSelectOption } from '../ds-select/ds-select.types';

@Component({
  selector: 'ds-multi-select',
  templateUrl: './ds-multi-select.component.html',
  styleUrl: './ds-multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsMultiSelectComponent),
      multi: true,
    },
  ],
})
export class DsMultiSelectComponent<T = string> implements ControlValueAccessor {
  readonly id = input('');
  readonly label = input('');
  readonly placeholder = input('Select options');
  readonly options = input<DsSelectOption<T>[]>([]);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly hint = input('');
  readonly error = input('');

  readonly selectionChange = output<T[]>();

  protected readonly value = signal<T[]>([]);
  protected readonly isDisabled = signal(false);
  protected readonly isOpen = signal(false);

  protected readonly selectedLabels = computed(() => {
    const selected = this.value();
    if (!selected.length) {
      return this.placeholder();
    }

    return this.options()
      .filter((option) => selected.includes(option.value))
      .map((option) => option.label)
      .join(', ');
  });

  #onChange: (value: T[]) => void = () => undefined;
  #onTouched: () => void = () => undefined;

  writeValue(value: T[] | null): void {
    this.value.set(value ?? []);
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  isFieldDisabled(): boolean {
    return this.disabled() || this.isDisabled();
  }

  toggleOpen(): void {
    if (this.isFieldDisabled()) {
      return;
    }

    this.isOpen.update((open) => !open);
  }

  isSelected(option: DsSelectOption<T>): boolean {
    return this.value().includes(option.value);
  }

  toggleOption(option: DsSelectOption<T>): void {
    if (option.disabled) {
      return;
    }

    const current = this.value();
    const next = current.includes(option.value)
      ? current.filter((value) => value !== option.value)
      : [...current, option.value];

    this.value.set(next);
    this.#onChange(next);
    this.selectionChange.emit(next);
  }

  onBlur(): void {
    this.isOpen.set(false);
    this.#onTouched();
  }
}
