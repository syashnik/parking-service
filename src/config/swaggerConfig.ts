import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { BookingController } from '../controllers/v1/bookingController';

const storage = getMetadataArgsStorage();
export const spec = routingControllersToSpec(
  storage,
  {
    routePrefix: '/api',
    controllers: [BookingController],
  },
  {
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        CreateBookingDto: {
          type: 'object',
          properties: {
            parkingSpotId: { type: 'string', format: 'uuid' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
          },
          required: ['parkingSpotId', 'startDate', 'endDate'],
        },
        PartialUpdateBookingDto: {
          type: 'object',
          properties: {
            parkingSpotId: { type: 'string', format: 'uuid' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
          },
        },
        ResponseBookingDto: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            parkingSpotId: { type: 'string', format: 'uuid' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  }
);
