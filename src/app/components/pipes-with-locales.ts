import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DateFormComponent, DateIanaForm } from './date-form';
import { TimezonePipe } from '../pipes/timezone';
import { locales } from './locale-data';

@Component({
  selector: 'app-pipes-with-locales',
  template: `
    <h1>Angular Pipes withLocales</h1>

    <app-date-form (dateIanaOutput)="onDateIanaOutput($event)" />

    <table mat-table [dataSource]="locales()" class="mat-elevation-z2">
      <ng-container matColumnDef="locale">
        <th mat-header-cell *matHeaderCellDef>Locale</th>
        <td mat-cell *matCellDef="let locale" class="bold">{{ locale }}</td>
      </ng-container>

      <ng-container matColumnDef="amountCode">
        <th mat-header-cell *matHeaderCellDef>Amount<br />(code)</th>
        <td mat-cell *matCellDef="let locale">
          {{ amount | currency: 'USD' : 'code' : digitsInfo : locale }}
        </td>
      </ng-container>

      <ng-container matColumnDef="amountSymbol">
        <th mat-header-cell *matHeaderCellDef>Amount<br />(symbol)</th>
        <td mat-cell *matCellDef="let locale">
          {{ amount | currency: 'USD' : 'symbol' : digitsInfo : locale }}
        </td>
      </ng-container>

      <ng-container matColumnDef="amountSymbolNarrow">
        <th mat-header-cell *matHeaderCellDef>Amount<br />(symbol-narrow)</th>
        <td mat-cell *matCellDef="let locale">
          {{ amount | currency: 'USD' : 'symbol-narrow' : digitsInfo : locale }}
        </td>
      </ng-container>

      <ng-container matColumnDef="dateShort">
        <th mat-header-cell *matHeaderCellDef>Date<br />(short)</th>
        <td mat-cell *matCellDef="let locale">
          {{ dateTime() | date: 'short' : timezone : locale }}
        </td>
      </ng-container>

      <ng-container matColumnDef="dateLong">
        <th mat-header-cell *matHeaderCellDef>Date<br />(long)</th>
        <td mat-cell *matCellDef="let locale">
          {{ dateTime() | date: 'long' : timezone : locale }}
        </td>
      </ng-container>

      <ng-container matColumnDef="tzShortName">
        <th mat-header-cell *matHeaderCellDef>
          <div>{{ ianaTimezone() }}</div>
          <div>TZ Short Name</div>
          <div>(custom pipe)</div>
        </th>
        <td mat-cell *matCellDef="let locale">
          {{ dateTime() | timezone : ianaTimezone() : locale}}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  imports: [MatTableModule, CurrencyPipe, DatePipe, DateFormComponent, TimezonePipe],
})
export class PipesWithLocalesComponent {
  readonly displayedColumns = [
    'locale',
    'amountCode',
    'amountSymbol',
    'amountSymbolNarrow',
    'dateShort',
    'dateLong',
    'tzShortName',
  ];

  readonly locales = signal(locales);
  readonly amount = 123.4567; // dollars

  // see https://angular.dev/api/common/CurrencyPipe
  readonly digitsInfo = undefined; // Default = '1.2.2'

  // see https://angular.dev/api/common/DatePipe
  // This is not IANA Timezone
  // This is just timezone represented as HoursMinutes
  // example: -600 (Usually New York Time)
  readonly timezone = undefined;

  readonly ianaTimezone = signal<string>('');
  readonly dateTime = signal<Date>(new Date());

  onDateIanaOutput(dateIana: DateIanaForm) {

    console.log('onDateIanaOutput', dateIana);
    this.ianaTimezone.set(dateIana.timezone);
    this.dateTime.set(new Date(dateIana.date));
  }

  readonly test = effect(() => {
    console.log('test', this.dateTime());
  })
}
