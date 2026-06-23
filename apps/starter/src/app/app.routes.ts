import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'grid',
    loadComponent: () => import('./pages/grid/grid.component').then(m => m.GridComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
