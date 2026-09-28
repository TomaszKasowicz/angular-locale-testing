import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';

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
          <a mat-list-item href="#">Link 1</a>
          <a mat-list-item href="#">Link 2</a>
          <a mat-list-item href="#">Link 3</a>
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
          <span>locale-testing</span>
        </mat-toolbar>
        <!-- Add Content Here -->
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
    
  `,
  imports: [
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
}
