import { Injectable } from '@nestjs/common';
import * as adhan from 'adhan';
import * as moment from 'moment-timezone';
import * as tzlookup from 'tz-lookup';

@Injectable()
export class PrayerTimesService {
  async calculatePrayerTimes(
    latitude: number,
    longitude: number,
    dateStr?: string,
    methodStr?: string,
    madhabStr?: string,
    timeFormat?: string,
  ) {
    // Parse date
    const date = dateStr ? new Date(dateStr) : new Date();

    // Get time zone
    const timeZone = tzlookup(latitude, longitude);

    // Set calculation method
    const method = this.getCalculationMethod(methodStr);

    // Set juristic method
    const madhab = this.getMadhab(madhabStr);

    // Create PrayerTimes instance
    const params = adhan.CalculationMethod[method]();
    params.madhab = adhan.Madhab[madhab];

    const prayerTimes = new adhan.PrayerTimes(
      { latitude, longitude },
      date,
      params,
    );

    // Format times
    const formattedTimes = {
      Fajr: this.formatTime(prayerTimes.fajr, timeZone, timeFormat),
      Sunrise: this.formatTime(prayerTimes.sunrise, timeZone, timeFormat),
      Dhuhr: this.formatTime(prayerTimes.dhuhr, timeZone, timeFormat),
      Asr: this.formatTime(prayerTimes.asr, timeZone, timeFormat),
      Maghrib: this.formatTime(prayerTimes.maghrib, timeZone, timeFormat),
      Isha: this.formatTime(prayerTimes.isha, timeZone, timeFormat),
    };

    return formattedTimes;
  }

  private formatTime(date: Date, timeZone: string, format: string): string {
    const timeFormat = format === '24' ? 'HH:mm' : 'hh:mm A';
    return moment(date).tz(timeZone).format(timeFormat);
  }

  private getCalculationMethod(methodStr: string): string {
    const methods = {
      MuslimWorldLeague: 'MuslimWorldLeague',
      Egyptian: 'Egyptian',
      Karachi: 'Karachi',
      UmmAlQura: 'UmmAlQura',
      Dubai: 'Dubai',
      MoonsightingCommittee: 'MoonsightingCommittee',
      NorthAmerica: 'NorthAmerica',
      Kuwait: 'Kuwait',
      Qatar: 'Qatar',
      Singapore: 'Singapore',
      Tehran: 'Tehran',
      Turkey: 'Turkey',
    };
    return methods[methodStr] || 'MuslimWorldLeague';
  }

  private getMadhab(madhabStr: string): string {
    const madhabs = {
      Shafi: 'Shafi',
      Hanafi: 'Hanafi',
    };
    return madhabs[madhabStr] || 'Shafi';
  }
}
