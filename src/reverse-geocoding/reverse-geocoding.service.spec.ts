import { Test, TestingModule } from '@nestjs/testing';
import { ReverseGeocodingService } from './reverse-geocoding.service';
import axios from 'axios';

jest.mock('axios');

describe('ReverseGeocodingService', () => {
  let service: ReverseGeocodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReverseGeocodingService],
    }).compile();

    service = module.get<ReverseGeocodingService>(ReverseGeocodingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLocationName', () => {
    it('should return location name', async () => {
      const mockResponse = {
        data: {
          display_name: 'Mecca, Saudi Arabia',
        },
      };
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.getLocationName(21.3891, 39.8579);
      expect(result).toBe('Mecca, Saudi Arabia');
    });

    it('should handle errors', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(service.getLocationName(21.3891, 39.8579)).rejects.toThrow(
        'Error fetching location name',
      );
    });
  });
});
