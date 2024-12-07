import { Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('@social-feed/social-feed-feature').then((m) => m.routes),
      },
      {
        path: 'post',
        loadChildren: () => import('@social-feed/social-post-feature').then((m) => m.routes),
      }
    ],
  },
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full',
  },
];
