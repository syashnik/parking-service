import { plainToInstance } from 'class-transformer';
import { Sequelize } from 'sequelize-typescript';
import { CreateBookingDto } from '../src/dtos/createBookingDto';
import { PartialUpdateBookingDto } from '../src/dtos/partialUpdateBookingDto';
import { ResponseBookingDto } from '../src/dtos/responseBookingDto';
import { UserRoleEnum } from '../src/enums/userRolesEnum';
import { Booking } from '../src/models/booking';
import { User } from '../src/models/user';
import { BookingRepository } from '../src/repositories/bookingRepository';
import { BookingService } from '../src/services/bookingService';

jest.mock('../src/repositories/bookingRepository');
jest.mock('../src/utils/logger');

describe('BookingService', () => {
  let bookingService: BookingService;
  let bookingRepository: jest.Mocked<BookingRepository>;

  beforeAll(async () => {
    const sequelize = new Sequelize('sqlite::memory:', { logging: false });
    sequelize.addModels([Booking]);
    await sequelize.sync();
  });

  beforeEach(() => {
    bookingRepository = new BookingRepository() as jest.Mocked<BookingRepository>;
    bookingService = new BookingService(bookingRepository);
    jest.clearAllMocks();
  });

  describe('getBookings', () => {
    it('should return all bookings', async () => {
      const bookings = [new Booking(), new Booking()];
      bookingRepository.findAllByUserId.mockResolvedValue(bookings);

      const result = await bookingService.getBookings({ role: UserRoleEnum.USER, id: 'some-user-id' } as User);

      expect(result).toEqual(bookings.map((booking) => plainToInstance(ResponseBookingDto, { ...booking.get() })));
      expect(bookingRepository.findAllByUserId).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBookingById', () => {
    it('should return booking by id', async () => {
      const booking = new Booking();
      bookingRepository.findById.mockResolvedValue(booking);

      const result = await bookingService.getBookingById('some-id');

      expect(result).toEqual(plainToInstance(ResponseBookingDto, { ...booking.get() }));
      expect(bookingRepository.findById).toHaveBeenCalledWith('some-id');
    });
  });

  describe('createBooking', () => {
    it('should create a booking', async () => {
      const userId = 'some-user-id';
      const createBookingDto: CreateBookingDto = {
        parkingSpotId: 'some-parking-spot-id',
        startDate: '2024-07-07T09:00:00.000Z',
        endDate: '2024-07-07T11:00:00.000Z',
      };

      const booking = new Booking();
      bookingRepository.findConflictingBookings.mockResolvedValue(null);
      bookingRepository.create.mockResolvedValue(booking);

      const result = await bookingService.createBooking(userId, createBookingDto);

      expect(result).toEqual(plainToInstance(ResponseBookingDto, { ...booking.get() }));
      expect(bookingRepository.findConflictingBookings).toHaveBeenCalled();
      expect(bookingRepository.create).toHaveBeenCalled();
    });

    it('should throw ConstraintViolationError when a validation error occurs', async () => {
      const userId = 'some-user-id';
      const createBookingDto = new CreateBookingDto();
      bookingRepository.findConflictingBookings.mockResolvedValue(null);
      const validationError = new Error('Validation error');
      validationError.name = 'SequelizeValidationError';
      bookingRepository.create.mockRejectedValue(validationError);

      await expect(bookingService.createBooking(userId, createBookingDto)).rejects.toThrow(Error);
    });
  });

  describe('updateBooking', () => {
    it('should update a booking', async () => {
      const booking = new Booking();
      bookingRepository.findById.mockResolvedValue(booking);
      bookingRepository.findConflictingBookings.mockResolvedValue(null);

      const result = await bookingService.updateBooking('some-id', new PartialUpdateBookingDto());

      expect(result).toEqual(plainToInstance(ResponseBookingDto, { ...booking.get() }));
      expect(bookingRepository.findById).toHaveBeenCalledWith('some-id');
      expect(bookingRepository.update).toHaveBeenCalled();
    });
  });

  describe('deleteBooking', () => {
    it('should delete a booking', async () => {
      const booking = new Booking();
      bookingRepository.findById.mockResolvedValue(booking);

      const result = await bookingService.deleteBooking('some-id');

      expect(result).toBe(true);
      expect(bookingRepository.findById).toHaveBeenCalledWith('some-id');
      expect(bookingRepository.delete).toHaveBeenCalledWith(booking);
    });
  });
});
