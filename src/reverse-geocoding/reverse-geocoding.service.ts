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
      const response = await this.fetchLocationData(
        latitude,
        longitude,
        language,
      );
      return this.extractLocationName(response);
    } catch (error) {
      this.handleError();
    }
  }

  private async fetchLocationData(
    latitude: number,
    longitude: number,
    language?: string,
  ) {
    const url = 'https://nominatim.openstreetmap.org/reverse';
    const params = {
      format: 'json',
      lat: latitude,
      lon: longitude,
      addressdetails: 1,
    };
    const headers = language ? { 'Accept-Language': language } : {};

    return await axios.get(url, { params, headers });
  }

  private extractLocationName(response: any): string {
    if (response.data && response.data.display_name) {
      return response.data.display_name;
    }
    throw new HttpException('Location name not found', HttpStatus.NOT_FOUND);
  }

  private handleError() {
    throw new HttpException(
      'Error fetching location name',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
