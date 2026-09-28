import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'timezone',
})
export class TimezonePipe implements PipeTransform {
  private static readonly options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short',
  };

  transform(value: Date, ianaTimeZone: string, locale = 'en-US') {
    // console.log('timezone', { value, ianaTimeZone, locale});

    const intl = new Intl.DateTimeFormat(locale, {
      ...TimezonePipe.options,
      timeZone: ianaTimeZone,
    });

    const res = intl.formatToParts(value);
    const timeZoneName = res.find(
      (part) => part.type === 'timeZoneName'
    )?.value;

    return timeZoneName;
  }
}