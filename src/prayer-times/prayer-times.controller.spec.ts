import { Test, TestingModule } from '@nestjs/testing';
import { PrayerTimesController } from './prayer-times.controller';
import { PrayerTimesService } from './prayer-times.service';
import { ReverseGeocodingService } from '../reverse-geocoding/reverse-geocoding.service';

describe('PrayerTimesController', () => {
  let controller: PrayerTimesController;
  let prayerTimesService: PrayerTimesService;
  let reverseGeocodingService: ReverseGeocodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrayerTimesController],
      providers: [
        {
          provide: PrayerTimesService,
          useValue: {
            calculatePrayerTimes: jest.fn(),
          },
        },
        {
          provide: ReverseGeocodingService,
          useValue: {
            getLocationName: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PrayerTimesController>(PrayerTimesController);
    prayerTimesService = module.get<PrayerTimesService>(PrayerTimesService);
    reverseGeocodingService = module.get<ReverseGeocodingService>(
      ReverseGeocodingService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPrayerTimes', () => {
    it('should return prayer times', async () => {
      const mockPrayerTimes = {
        Fajr: '05:00 AM',
        Sunrise: '06:30 AM',
        Dhuhr: '12:00 PM',
        Asr: '03:30 PM',
        Maghrib: '06:30 PM',
        Isha: '08:00 PM',
      };
      jest
        .spyOn(prayerTimesService, 'calculatePrayerTimes')
        .mockResolvedValue(mockPrayerTimes);

      const result = await controller.getPrayerTimes({
        latitude: 21.3891,
        longitude: 39.8579,
      });

      expect(result).toEqual(mockPrayerTimes);
    });
  });

  describe('getLocationName', () => {
    it('should return location name', async () => {
      const mockLocationName = 'Mecca, Saudi Arabia';
      jest
        .spyOn(reverseGeocodingService, 'getLocationName')
        .mockResolvedValue(mockLocationName);

      const result = await controller.getLocationName({
        latitude: 21.3891,
        longitude: 39.8579,
      });

      expect(result).toEqual({ locationName: mockLocationName });
    });
  });
});
