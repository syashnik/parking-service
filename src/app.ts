import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import Container from 'typedi';
import sequelize from './config/database';
import { spec } from './config/swaggerConfig';
import { BookingController } from './controllers/v1/bookingController';
import { AuthMiddleware } from './middleware/auth/authMiddleware';
import { ErrorHandlerMiddleware } from './middleware/errorHandlerMiddleware';

useContainer(Container);

const app = express();

app.use(morgan('combined'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec));

app.use((req, res, next) => {
  const authMiddleware = Container.get(AuthMiddleware);
  authMiddleware.use(req, res, next);
});

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [BookingController],
  middlewares: [ErrorHandlerMiddleware],
  defaultErrorHandler: false,
  validation: true,
});

app.use(bodyParser.json());
app.set('sequelize', sequelize);

export default app;
