import { plainToInstance } from 'class-transformer';
import { Inject, Service } from 'typedi';
import { CreateBookingDto } from '../dtos/createBookingDto';
import { PartialUpdateBookingDto } from '../dtos/partialUpdateBookingDto';
import { ResponseBookingDto } from '../dtos/responseBookingDto';
import { UserRoleEnum } from '../enums/userRolesEnum';
import { NotFoundError } from '../errors/notFoundError';
import { ValidationError } from '../errors/validationError';
import { Booking } from '../models/booking';
import { User } from '../models/user';
import { BookingRepository } from '../repositories/bookingRepository';

@Service()
export class BookingService {
  constructor(@Inject() private readonly bookingRepository: BookingRepository) {}

  async getBookings(user: User): Promise<ResponseBookingDto[]> {
    let bookings: Booking[] = [];
    if (user.role === UserRoleEnum.ADMIN) {
      bookings = await this.bookingRepository.findAll();
    } else {
      bookings = await this.bookingRepository.findAllByUserId(user.id);
    }
    return bookings.map((booking) => this.toResponse(booking));
  }

  async getBookingById(id: string): Promise<ResponseBookingDto> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new NotFoundError('Booking not found');
    }
    return this.toResponse(booking);
  }

  async createBooking(userId: string | undefined, data: CreateBookingDto): Promise<ResponseBookingDto> {
    if (!userId) {
      throw new ValidationError('User ID is required to create a booking');
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const existingBooking = await this.bookingRepository.findConflictingBookings(
      data.parkingSpotId,
      startDate,
      endDate
    );

    if (existingBooking) {
      throw new ValidationError('This parking spot is already booked for the selected time range');
    }

    const booking = await this.bookingRepository.create({
      ...data,
      userId,
      startDate,
      endDate,
    });
    return this.toResponse(booking);
  }

  async updateBooking(id: string, data: PartialUpdateBookingDto): Promise<ResponseBookingDto> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    const startDate = new Date(data.startDate || booking.startDate);
    const endDate = new Date(data.endDate || booking.endDate);
    const existingBooking = await this.bookingRepository.findConflictingBookings(
      data.parkingSpotId || booking.parkingSpotId,
      startDate,
      endDate,
      id
    );

    if (existingBooking) {
      throw new ValidationError('This parking spot is already booked for the selected time range');
    }

    await this.bookingRepository.update(booking, { ...data, startDate, endDate });
    return this.toResponse(booking);
  }

  async deleteBooking(id: string): Promise<boolean> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new NotFoundError('Booking not found');
    }
    await this.bookingRepository.delete(booking);
    return true;
  }

  private toResponse(booking: Booking): ResponseBookingDto {
    return plainToInstance(ResponseBookingDto, { ...booking.get() });
  }
}
