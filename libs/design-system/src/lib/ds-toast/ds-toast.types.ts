export type DsToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface DsToast {
  id: string;
  message: string;
  title?: string;
  variant: DsToastVariant;
  duration: number;
}

export interface DsToastOptions {
  title?: string;
  variant?: DsToastVariant;
  duration?: number;
}
