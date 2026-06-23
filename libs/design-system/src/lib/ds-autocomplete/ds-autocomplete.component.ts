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

import { DsAutocompleteOption } from './ds-autocomplete.types';

@Component({
  selector: 'ds-autocomplete',
  templateUrl: './ds-autocomplete.component.html',
  styleUrl: './ds-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsAutocompleteComponent),
      multi: true,
    },
  ],
})
export class DsAutocompleteComponent<T = string> implements ControlValueAccessor {
  readonly id = input('');
  readonly label = input('');
  readonly placeholder = input('Search...');
  readonly options = input<DsAutocompleteOption<T>[]>([]);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly hint = input('');
  readonly error = input('');

  readonly selectionChange = output<T | null>();

  protected readonly query = signal('');
  protected readonly value = signal<T | null>(null);
  protected readonly isDisabled = signal(false);
  protected readonly isOpen = signal(false);

  protected readonly filteredOptions = computed(() => {
    const term = this.query().trim().toLowerCase();
    if (!term) {
      return this.options();
    }

    return this.options().filter((option) => option.label.toLowerCase().includes(term));
  });

  #onChange: (value: T | null) => void = () => undefined;
  #onTouched: () => void = () => undefined;

  writeValue(value: T | null): void {
    this.value.set(value);
    const match = this.options().find((option) => option.value === value);
    this.query.set(match?.label ?? '');
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

  isFieldDisabled(): boolean {
    return this.disabled() || this.isDisabled();
  }

  onInput(value: string): void {
    this.query.set(value);
    this.isOpen.set(true);

    const exact = this.options().find((option) => option.label === value);
    const nextValue = exact?.value ?? null;
    this.value.set(nextValue);
    this.#onChange(nextValue);
    this.selectionChange.emit(nextValue);
  }

  selectOption(option: DsAutocompleteOption<T>): void {
    if (option.disabled) {
      return;
    }

    this.query.set(option.label);
    this.value.set(option.value);
    this.isOpen.set(false);
    this.#onChange(option.value);
    this.selectionChange.emit(option.value);
    this.#onTouched();
  }

  onFocus(): void {
    this.isOpen.set(true);
  }

  onBlur(): void {
    this.isOpen.set(false);
    this.#onTouched();
  }
}
