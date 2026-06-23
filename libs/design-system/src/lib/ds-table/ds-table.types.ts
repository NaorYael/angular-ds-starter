export interface DsTableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  align?: 'start' | 'center' | 'end';
}
