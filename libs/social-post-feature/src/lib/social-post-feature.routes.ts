import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./social-post-feature.component'),
  },
]
