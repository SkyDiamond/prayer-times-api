import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrayerTimesController } from './prayer-times/prayer-times.controller';
import { PrayerTimesService } from './prayer-times/prayer-times.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [],
  controllers: [AppController, PrayerTimesController, HealthController],
  providers: [AppService, PrayerTimesService],
})
export class AppModule {}
