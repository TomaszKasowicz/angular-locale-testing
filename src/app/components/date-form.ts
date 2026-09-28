import { Component, computed, effect, output, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

export type DateIanaForm = {
  date: string;
  timezone: string;
};

const ISO_UTC_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;

@Component({
  selector: 'app-date-form',
  template: `
    <mat-card>
    <mat-card-header>
      <mat-card-title>Date Form</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <form>
        <mat-form-field>
          <mat-label>Date</mat-label>
          <input
            matInput
            type="text"
            placeholder="YYYY-MM-DDTHH:MM:SSZ"
            [formField]="dateIanaForm.date"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>IANA Timezone</mat-label>
          <input type="text" 
           placeholder="Pick Timezone" 
           aria-label="Timezone" 
           matInput 
           [formField]="dateIanaForm.timezone"
           [matAutocomplete]="auto"
           (mousedown)="clearTimezone()"
           (keydown.escape)="restoreTimezone($event)">
          <mat-autocomplete 
            autoActiveFirstOption 
            #auto="matAutocomplete"
            (optionSelected)="onTimezoneSelected($event)">
            @for (option of filteredTimezones(); track option) {
              <mat-option [value]="option">{{option}}</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      </form>
    </mat-card-content>
    </mat-card>
  `,
  styles: `
    form {
      display: flex;
      gap: 1rem;
    }
    mat-form-field {
      flex: 1;
    }
  `,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatAutocompleteModule, 
    FormField,
    MatCardModule,
  ]
})
export class DateFormComponent {
  readonly timezones=signal(Intl.supportedValuesOf('timeZone'));
  private dateIanaModel = signal<DateIanaForm>({
    date: new Date().toISOString().slice(0,-5) + 'Z',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  private previousTimezone = this.dateIanaModel().timezone;

  readonly dateIanaForm = form(this.dateIanaModel, (schemaPath) => {
    pattern(schemaPath.date, ISO_UTC_PATTERN, {
      message: 'Date must be in format: YYYY-MM-DDTHH:MM:SSZ',
    });
    required(schemaPath.date, {
      message: 'Date is required',
    });
    required(schemaPath.timezone, {
      message: 'Timezone is required',
    });
  });

  readonly filteredTimezones = computed(() => {
    const value = this.dateIanaForm.timezone().value() ?? '';
    return this.timezones().filter(tz => tz.toLowerCase().includes(value.toLowerCase()));
  });

  readonly dateIanaOutput = output<DateIanaForm>();

  readonly emit = effect(() => {
    const form = this.dateIanaForm();
    if (form.valid()) {
      this.dateIanaOutput.emit(form.value());
    }
  });

  clearTimezone(): void {
    const current = this.dateIanaForm.timezone().value() ?? '';
    if (!current) {
      return;
    }
    this.previousTimezone = current;
    this.dateIanaForm.timezone().value.set('');
  }

  onTimezoneSelected(event: MatAutocompleteSelectedEvent): void {
    this.previousTimezone = event.option.value;
  }

  restoreTimezone(event: Event): void {
    event.preventDefault();
    this.dateIanaForm.timezone().value.set(this.previousTimezone);
  }
}
