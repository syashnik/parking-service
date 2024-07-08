import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'Create Booking DTO' })
export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  parkingSpotId!: string;

  @IsDateString()
  @IsNotEmpty()
  startDate!: string;

  @IsDateString()
  @IsNotEmpty()
  endDate!: string;
}
