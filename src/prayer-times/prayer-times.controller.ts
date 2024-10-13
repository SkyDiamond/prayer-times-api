import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PrayerTimesService } from './prayer-times.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PrayerTimesDto } from './dto/prayer-times.dto';
import { LocationNameDto } from './dto/location-name.dto';
import { ReverseGeocodingService } from '../reverse-geocoding/reverse-geocoding.service';

@ApiTags('Prayer Times')
@Controller('prayer-times')
export class PrayerTimesController {
  constructor(
    private readonly prayerTimesService: PrayerTimesService,
    private readonly reverseGeocodingService: ReverseGeocodingService,
  ) {}

  @Post()
  @ApiBody({ type: PrayerTimesDto })
  @ApiResponse({
    status: 200,
    description: 'Prayer times retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async getPrayerTimes(
    @Body(new ValidationPipe({ transform: true }))
    prayerTimesDto: PrayerTimesDto,
  ) {
    const { latitude, longitude, date, method, madhab, timeFormat } =
      prayerTimesDto;

    const calculationMethod = method || 'MuslimWorldLeague';
    const juristicMethod = madhab || 'Shafi';
    const format = timeFormat || '12'; // Default to 12-hour format

    const prayerTimes = await this.prayerTimesService.calculatePrayerTimes(
      latitude,
      longitude,
      date,
      calculationMethod,
      juristicMethod,
      format,
    );

    return prayerTimes;
  }

  @Post('location-name')
  @ApiBody({ type: LocationNameDto })
  @ApiResponse({
    status: 200,
    description: 'Location name retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async getLocationName(
    @Body(new ValidationPipe({ transform: true }))
    locationNameDto: LocationNameDto,
  ) {
    const { latitude, longitude, language } = locationNameDto;

    const locationName = await this.reverseGeocodingService.getLocationName(
      latitude,
      longitude,
      language,
    );

    return { locationName };
  }
}
