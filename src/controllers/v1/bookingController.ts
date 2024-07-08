import { validateOrReject } from 'class-validator';
import { Request } from 'express';
import { Body, Delete, Get, JsonController, Param, Post, Put, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { CreateBookingDto } from '../../dtos/createBookingDto';
import { PartialUpdateBookingDto } from '../../dtos/partialUpdateBookingDto';
import { UserRoleEnum } from '../../enums/userRolesEnum';
import { HasRoleOrOwnershipMiddlewareFactory } from '../../middleware/guards/permissionMiddleware';
import { IsValidUUIDMiddleware } from '../../middleware/validation/IsValidUUIDMiddleware';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/bookingService';

@Service()
@JsonController('/v1/bookings')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class BookingController {
  constructor(@Inject() private readonly bookingService: BookingService) {}

  @Get('/')
  @UseBefore(HasRoleOrOwnershipMiddlewareFactory(UserRoleEnum.ADMIN, Booking))
  @OpenAPI({
    summary: 'Get all bookings',
    responses: {
      '200': {
        description: 'List of bookings',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/ResponseBookingDto' },
            },
          },
        },
      },
    },
  })
  async getAll(@Req() req: Request) {
    try {
      return await this.bookingService.getBookings(req.user);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @UseBefore(IsValidUUIDMiddleware)
  @UseBefore(HasRoleOrOwnershipMiddlewareFactory(UserRoleEnum.ADMIN, Booking))
  @OpenAPI({
    summary: 'Get a booking by ID',
    responses: {
      '200': {
        description: 'Booking details',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ResponseBookingDto' },
          },
        },
      },
      '404': { description: 'Booking not found' },
    },
  })
  async getOne(@Param('id') id: string) {
    try {
      return await this.bookingService.getBookingById(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @OpenAPI({
    summary: 'Create a new booking',
    requestBody: {
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreateBookingDto' },
        },
      },
    },
    responses: {
      '201': {
        description: 'Booking created',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ResponseBookingDto' },
          },
        },
      },
      '400': { description: 'Invalid input' },
    },
  })
  async create(@Body() bookingData: CreateBookingDto, @Req() req: Request) {
    try {
      await validateOrReject(bookingData);
      return await this.bookingService.createBooking(req.user?.id, bookingData);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @UseBefore(IsValidUUIDMiddleware)
  @UseBefore(HasRoleOrOwnershipMiddlewareFactory(UserRoleEnum.ADMIN, Booking))
  @OpenAPI({
    summary: 'Update a booking',
    requestBody: {
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/PartialUpdateBookingDto' },
        },
      },
    },
    responses: {
      '200': {
        description: 'Booking updated',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ResponseBookingDto' },
          },
        },
      },
      '404': { description: 'Booking not found' },
      '400': { description: 'Invalid input' },
    },
  })
  async update(@Param('id') id: string, @Body() bookingData: PartialUpdateBookingDto) {
    try {
      await validateOrReject(bookingData);
      return await this.bookingService.updateBooking(id, bookingData);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  @UseBefore(IsValidUUIDMiddleware)
  @UseBefore(HasRoleOrOwnershipMiddlewareFactory(UserRoleEnum.ADMIN, Booking))
  @OpenAPI({
    summary: 'Delete a booking',
    responses: {
      '200': { description: 'Booking deleted' },
      '404': { description: 'Booking not found' },
    },
  })
  async delete(@Param('id') id: string) {
    try {
      return await this.bookingService.deleteBooking(id);
    } catch (error) {
      throw error;
    }
  }
}
