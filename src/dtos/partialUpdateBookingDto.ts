import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'Partial Update Booking DTO' })
export class PartialUpdateBookingDto {
  @IsUUID()
  @IsOptional()
  parkingSpotId?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  endDate?: string;
}
