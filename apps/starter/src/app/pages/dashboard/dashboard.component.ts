import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DsAlertComponent, DsAvatarComponent, DsButtonComponent } from '@ds/design-system';

import { ApiService } from '../../core/api/api.service';
import { AuthService } from '../../core/auth/auth.service';

interface TodoItem {
  id: number;
  title: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [DsAvatarComponent, DsButtonComponent, DsAlertComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  readonly user = this.authService.user;
  readonly sampleTodos = signal<TodoItem[]>([]);
  readonly apiError = signal('');
  readonly apiLoading = signal(false);

  loadSampleData(): void {
    this.apiLoading.set(true);
    this.apiError.set('');

    this.apiService.get<TodoItem[]>('/todos?_limit=3').subscribe({
      next: (items) => {
        this.sampleTodos.set(items);
        this.apiLoading.set(false);
      },
      error: () => {
        this.apiError.set('API request failed. Check network or CORS settings.');
        this.apiLoading.set(false);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
