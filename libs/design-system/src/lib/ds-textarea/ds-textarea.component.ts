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
  selector: 'ds-textarea',
  imports: [FormsModule],
  templateUrl: './ds-textarea.component.html',
  styleUrl: './ds-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsTextareaComponent),
      multi: true,
    },
  ],
})
export class DsTextareaComponent implements ControlValueAccessor {
  readonly id = input('');
  readonly label = input('');
  readonly placeholder = input('');
  readonly rows = input(4);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly hint = input('');
  readonly error = input('');
  readonly maxLength = input<number | null>(null);

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

  characterCount(): string {
    const max = this.maxLength();
    if (max === null) {
      return '';
    }

    return `${this.value().length}/${max}`;
  }
}
