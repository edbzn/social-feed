import { Routes } from '@angular/router';
import { TabsComponent } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@social-feed/social-feed-feature').then((m) => m.routes),
      }
    ],
  }
];
