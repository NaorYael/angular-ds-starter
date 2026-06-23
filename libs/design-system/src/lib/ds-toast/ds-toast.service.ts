import { Injectable, signal } from '@angular/core';

import { DsToast, DsToastOptions, DsToastVariant } from './ds-toast.types';

@Injectable({ providedIn: 'root' })
export class DsToastService {
  readonly toasts = signal<DsToast[]>([]);

  #timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  show(message: string, options: DsToastOptions = {}): string {
    const id = crypto.randomUUID();
    const toast: DsToast = {
      id,
      message,
      title: options.title,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 4000,
    };

    this.toasts.update((current) => [...current, toast]);

    if (toast.duration > 0) {
      const timeout = setTimeout(() => this.dismiss(id), toast.duration);
      this.#timeouts.set(id, timeout);
    }

    return id;
  }

  success(message: string, options: Omit<DsToastOptions, 'variant'> = {}): string {
    return this.show(message, { ...options, variant: 'success' });
  }

  error(message: string, options: Omit<DsToastOptions, 'variant'> = {}): string {
    return this.show(message, { ...options, variant: 'error' });
  }

  warning(message: string, options: Omit<DsToastOptions, 'variant'> = {}): string {
    return this.show(message, { ...options, variant: 'warning' });
  }

  info(message: string, options: Omit<DsToastOptions, 'variant'> = {}): string {
    return this.show(message, { ...options, variant: 'info' });
  }

  dismiss(id: string): void {
    const timeout = this.#timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.#timeouts.delete(id);
    }

    this.toasts.update((current) => current.filter((toast) => toast.id !== id));
  }

  clear(): void {
    for (const timeout of this.#timeouts.values()) {
      clearTimeout(timeout);
    }

    this.#timeouts.clear();
    this.toasts.set([]);
  }

  variantLabel(variant: DsToastVariant): string {
    const labels: Record<DsToastVariant, string> = {
      info: 'Info',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
    };

    return labels[variant];
  }
}
