import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { DsToastService } from '@ds/design-system';

import { AuthService } from '../auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(DsToastService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.logout();
        toast.error('Your session expired. Please sign in again.');
        router.navigateByUrl('/login');
      } else if (error.status >= 500) {
        toast.error('Server error. Please try again later.', { title: 'Request failed' });
      }

      return throwError(() => error);
    }),
  );
};
