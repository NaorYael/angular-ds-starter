import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  readonly #count = signal(0);

  readonly isLoading = computed(() => this.#count() > 0);

  start(): void {
    this.#count.update((count) => count + 1);
  }

  stop(): void {
    this.#count.update((count) => Math.max(0, count - 1));
  }
}
