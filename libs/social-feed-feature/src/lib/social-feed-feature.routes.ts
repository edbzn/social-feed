import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feed',
    loadComponent: () => import('./social-feed-feature.component'),
  },
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full',
  },
]
