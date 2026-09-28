import { Route } from '@angular/router';
import { NavComponent } from './nav.component';
import { LocalesComponent } from './components/locales';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'locales',
        pathMatch: 'full'
      },
      {
        path: 'locales',
        component: LocalesComponent,
        title: 'Locales'
      }
    ]
  }
];
