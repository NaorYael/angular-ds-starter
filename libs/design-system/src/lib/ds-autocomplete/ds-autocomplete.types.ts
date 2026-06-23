export interface DsAutocompleteOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
