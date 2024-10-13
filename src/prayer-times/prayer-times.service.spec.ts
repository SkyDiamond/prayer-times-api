import { Test, TestingModule } from '@nestjs/testing';
import { PrayerTimesService } from './prayer-times.service';

describe('PrayerTimesService', () => {
  let service: PrayerTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrayerTimesService],
    }).compile();

    service = module.get<PrayerTimesService>(PrayerTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate prayer times', async () => {
    const result = await service.calculatePrayerTimes(21.3891, 39.8579);
    expect(result).toHaveProperty('Fajr');
    expect(result).toHaveProperty('Sunrise');
    expect(result).toHaveProperty('Dhuhr');
    expect(result).toHaveProperty('Asr');
    expect(result).toHaveProperty('Maghrib');
    expect(result).toHaveProperty('Isha');
  });

  it('should use custom calculation method', async () => {
    const result = await service.calculatePrayerTimes(
      21.3891,
      39.8579,
      undefined,
      'Egyptian',
    );
    expect(result).toBeDefined();
  });

  it('should use custom madhab', async () => {
    const result = await service.calculatePrayerTimes(
      21.3891,
      39.8579,
      undefined,
      undefined,
      'Hanafi',
    );
    expect(result).toBeDefined();
  });

  it('should use 24-hour time format', async () => {
    const result = await service.calculatePrayerTimes(
      21.3891,
      39.8579,
      undefined,
      undefined,
      undefined,
      '24',
    );
    expect(result.Fajr).not.toContain('AM');
    expect(result.Fajr).not.toContain('PM');
  });
});
