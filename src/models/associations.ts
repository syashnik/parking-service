import { Booking } from './booking';
import { ParkingSpot } from './parkingSpot';
import { User } from './user';

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

ParkingSpot.hasMany(Booking, { foreignKey: 'parkingSpotId' });
Booking.belongsTo(ParkingSpot, { foreignKey: 'parkingSpotId' });
