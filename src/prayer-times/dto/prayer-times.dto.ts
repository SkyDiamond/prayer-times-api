import { IsNumber, IsOptional, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PrayerTimesDto {
  @ApiProperty({ example: 21.3891, description: 'Latitude coordinate' })
  @IsNumber()
  @Type(() => Number)
  latitude: number;

  @ApiProperty({ example: 39.8579, description: 'Longitude coordinate' })
  @IsNumber()
  @Type(() => Number)
  longitude: number;

  @ApiProperty({
    required: false,
    example: '2023-10-15',
    description: 'Date in YYYY-MM-DD format',
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiProperty({
    required: false,
    example: 'MuslimWorldLeague',
    description: 'Calculation method',
  })
  @IsOptional()
  @IsString()
  method?: string;

  @ApiProperty({
    required: false,
    example: 'Shafi',
    description: 'Juristic method',
  })
  @IsOptional()
  @IsString()
  madhab?: string;

  @ApiProperty({
    required: false,
    enum: ['12', '24'],
    example: '24',
    description: 'Time format',
  })
  @IsOptional()
  @IsIn(['12', '24'])
  timeFormat?: string;
}
