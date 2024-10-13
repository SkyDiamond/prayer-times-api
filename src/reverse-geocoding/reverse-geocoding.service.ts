// src/prayer-times/reverse-geocoding.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ReverseGeocodingService {
  async getLocationName(
    latitude: number,
    longitude: number,
    language?: string,
  ): Promise<string> {
    try {
      const url = 'https://nominatim.openstreetmap.org/reverse';
      const params = {
        format: 'json',
        lat: latitude,
        lon: longitude,
        addressdetails: 1,
      };

      const headers = {};

      if (language) {
        headers['Accept-Language'] = language;
      }

      const response = await axios.get(url, { params, headers });

      if (response.data && response.data.display_name) {
        return response.data.display_name;
      }

      throw new HttpException('Location name not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(
        'Error fetching location name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
