import '@angular/common/locales/global/en-GB';
import '@angular/common/locales/global/es';
import '@angular/common/locales/global/fr';
import '@angular/common/locales/global/pl';
import '@angular/common/locales/global/en-150';
import { Component } from '@angular/core';


const locales = ['en-US', 'en-GB', 'es', 'fr', 'pl', 'en-150'];

@Component({
  selector: 'app-locales',
  template: `
    <h1>Locales</h1>
  `,
})
export class LocalesComponent {
  constructor() {
    console.log(locales)
  }
}