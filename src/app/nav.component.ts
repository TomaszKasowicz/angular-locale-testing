import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  template: `
    @let isHandset = this.isHandset();
    
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [attr.role]="isHandset ? 'dialog' : 'navigation'"
          [mode]="isHandset ? 'over' : 'side'"
          [opened]="isHandset === false">
        <mat-toolbar>Menu</mat-toolbar>
        <mat-nav-list>
          @for (item of navItems; track item.path) {
            <a mat-list-item [routerLink]="item.path">{{ item.title }}</a>
          }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar>
          @if (isHandset) {
            <button
              type="button"
              aria-label="Toggle sidenav"
              matIconButton
              (click)="drawer.toggle()">
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
          }
          <span>Locale and Timezone Testing</span>
        </mat-toolbar>
        <div class="sidenav-content">
          <router-outlet/>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
    
  `,
  styles: `
    .sidenav-container {
      height: 100%;
    }
    
    .sidenav {
      width: 200px;
    }
    
    .sidenav .mat-toolbar {
      background: inherit;
    }
    
    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .sidenav-content {
      padding: 20px;
    }
    
  `,
  imports: [
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ]
})
export class NavComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset = toSignal(this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches)), { initialValue: false });

  readonly navItems = inject(Router).config[0].children?.filter(route => route.path !== '').map(route => ({ path: route.path, title: route.title }));
}
