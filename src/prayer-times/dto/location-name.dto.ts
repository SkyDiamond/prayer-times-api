import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LocationNameDto {
  @ApiProperty({ example: 21.3891, description: 'Latitude coordinate' })
  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({ example: 39.8579, description: 'Longitude coordinate' })
  @IsNumber()
  @Type(() => Number)
  longitude: number;

  @ApiPropertyOptional({
    example: 'en',
    description: 'Language code (ISO 639-1)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z]{2}$/, { message: 'Language must be a 2-letter code' })
  language?: string;
}
