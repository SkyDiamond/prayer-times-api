import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrayerTimesController } from './prayer-times/prayer-times.controller';
import { PrayerTimesService } from './prayer-times/prayer-times.service';
import { HealthController } from './health/health.controller';
import { ReverseGeocodingService } from './reverse-geocoding/reverse-geocoding.service';

@Module({
  imports: [],
  controllers: [AppController, PrayerTimesController, HealthController],
  providers: [AppService, PrayerTimesService, ReverseGeocodingService],
})
export class AppModule {}
