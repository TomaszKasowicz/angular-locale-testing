import { Component, signal } from "@angular/core";
import { locales } from './locale-data';
import { DateFormComponent, DateIanaForm } from "./date-form";
import { IntlDatePipe } from "../pipes/intl-date";
import { TimezonePipe } from "../pipes/timezone";
import { MatTableModule } from "@angular/material/table";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-datetimes',
  template: `
  <h1>Date Time with Timezones using custom pipe</h1>
  <app-date-form (dateIanaOutput)="onDateIanaOutput($event)" />

  <table mat-table [dataSource]="localeData" class="mat-elevation-z2">
    <ng-container matColumnDef="locale">
        <th mat-header-cell *matHeaderCellDef>Locale</th>
        <td mat-cell *matCellDef="let locale" class="bold">{{ locale }}</td>
    </ng-container>
    <ng-container matColumnDef="dateShort">
      <th mat-header-cell *matHeaderCellDef> Date Short </th>
      <td mat-cell *matCellDef="let locale"> {{ dateTime() | intlDate : 'short' : ianaTimezone() : locale }} </td>
    </ng-container>
    <ng-container matColumnDef="dateLong">
      <th mat-header-cell *matHeaderCellDef> Date Long </th>
      <td mat-cell *matCellDef="let locale"> {{ dateTime() | intlDate : 'long' : ianaTimezone() : locale }} </td>
    </ng-container>
    <ng-container matColumnDef="timezone">
      <th mat-header-cell *matHeaderCellDef> Timezone </th>
      <td mat-cell *matCellDef="let locale">
      {{ dateTime() | timezone : ianaTimezone() : locale }}
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>

  <h2>Current Date With Current Timezone ({{ systemTimezone() }}, {{ systemLocale() }})</h2>
  <p>{{ dateTime() | date : 'short' : timezone : systemLocale() }}</p>
  <p>{{ dateTime() | date : 'long' : timezone : systemLocale() }}</p>
  `,
  imports: [MatTableModule, IntlDatePipe, TimezonePipe, DateFormComponent, DatePipe],
})
export class DatetimesComponent {
  readonly displayedColumns = ['locale', 'dateShort', 'dateLong', 'timezone'];
  readonly localeData = locales;
    // see https://angular.dev/api/common/DatePipe
  // This is not IANA Timezone
  // This is just timezone represented as HoursMinutes
  // example: -600 (Usually New York Time)
  readonly timezone = undefined;

  readonly ianaTimezone = signal<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
  readonly dateTime = signal<Date>(new Date());

  readonly systemTimezone = signal<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
  readonly systemLocale = signal(navigator.language);
  
  onDateIanaOutput(dateIana: DateIanaForm) {
    this.ianaTimezone.set(dateIana.timezone);
    this.dateTime.set(new Date(dateIana.date));
  }
}