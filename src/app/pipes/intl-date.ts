import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'intlDate',
})
export class IntlDatePipe implements PipeTransform {

  private static readonly shortDate: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  private static readonly longDate: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  private static readonly shortTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  private static readonly longTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'shortOffset',
  };

  transform(value: Date, format: string | undefined = undefined, timezone: string | undefined = undefined, locale: string | undefined = undefined) {
    const isLong = format === 'long';
    const dateOptions = isLong ? IntlDatePipe.longDate : IntlDatePipe.shortDate;
    const timeOptions = isLong ? IntlDatePipe.longTime : IntlDatePipe.shortTime;

    const datePart = new Intl.DateTimeFormat(locale, {
      ...dateOptions,
      timeZone: timezone,
    }).format(value);

    const timePart = new Intl.DateTimeFormat(locale, {
      ...timeOptions,
      timeZone: timezone,
    }).format(value);

    return `${datePart}, ${timePart}`;
  }
}
