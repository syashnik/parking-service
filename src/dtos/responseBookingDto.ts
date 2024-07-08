import { Expose } from 'class-transformer';
import { IsDateString, IsUUID } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'Response Booking DTO' })
export class ResponseBookingDto {
  @IsUUID()
  @Expose()
  id!: string;

  @IsUUID()
  @Expose()
  userId!: string;

  @IsUUID()
  @Expose()
  parkingSpotId!: string;

  @IsDateString()
  @Expose()
  startDate!: string;

  @IsDateString()
  @Expose()
  endDate!: string;

  @Expose()
  @IsDateString()
  createdAt!: string;

  @Expose()
  @IsDateString()
  updatedAt!: string;
}
