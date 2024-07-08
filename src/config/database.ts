import { Sequelize } from 'sequelize-typescript';
import { Booking } from '../models/booking';
import { ParkingSpot } from '../models/parkingSpot';
import { User } from '../models/user';
import appConfig from './appConfig';

const { host, port, username, password, database } = appConfig.getDatabaseConfig();
const sequelize = new Sequelize({
  dialect: 'postgres',
  host,
  port,
  username,
  password,
  database,
  models: [User, Booking, ParkingSpot],
  logging: false,
});

import '../models/associations';

export default sequelize;
