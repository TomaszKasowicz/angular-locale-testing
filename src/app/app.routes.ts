import { Route } from '@angular/router';
import { NavComponent } from './nav.component';
import { PipesWithLocalesComponent } from './components/pipes-with-locales';
import { DatetimesComponent } from './components/datetimes';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'datetimes',
        pathMatch: 'full'
      },
      {
        path: 'pipes-with-locales',
        component: PipesWithLocalesComponent,
        title: 'Pipes with Locales'
      },
      {
        path: 'datetimes',
        component: DatetimesComponent,
        title: 'Date Time with Timezones'
      }
    ]
  }
];
