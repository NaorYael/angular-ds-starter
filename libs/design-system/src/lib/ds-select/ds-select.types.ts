export interface DsSelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
