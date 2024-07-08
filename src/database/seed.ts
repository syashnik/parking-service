import sequelize from '../config/database';
import { Booking } from '../models/booking';
import { ParkingSpot } from '../models/parkingSpot';
import { User } from '../models/user';

async function seed() {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate([
    {
      id: '847d97ca-11ef-4429-98e4-40b418ff93bc',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      token: 'admin',
    },
    {
      id: '866874ce-e326-4cea-b717-00628b297837',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      token: 'user',
    },
  ]);

  const parkingSpots = await ParkingSpot.bulkCreate([
    {
      id: '0b931c00-73ac-4f5a-88c1-2487880838fc',
      name: 'Spot 1',
    },
    {
      id: '6d7c479b-7c3c-4c26-8e45-a9e462cf91e6',
      name: 'Spot 2',
    },
    {
      id: '8bb69464-e5d0-4d8e-8d1a-52f541f6c251',
      name: 'Spot 3',
    },
    {
      id: '8bc98511-99e0-4f37-aaf6-22fd4d908f4f',
      name: 'Spot 4',
    },
    {
      id: '9d251159-af63-4d2b-aa6d-e32192aa2e97',
      name: 'Spot 5',
    },
  ]);

  const user1 = await User.findOne({ where: { email: 'john.doe@example.com' } });
  const user2 = await User.findOne({ where: { email: 'jane.smith@example.com' } });
  const spot1 = await ParkingSpot.findOne({ where: { name: 'Spot 1' } });
  const spot2 = await ParkingSpot.findOne({ where: { name: 'Spot 2' } });
  const spot3 = await ParkingSpot.findOne({ where: { name: 'Spot 3' } });

  await Booking.bulkCreate([
    {
      userId: user1?.id,
      parkingSpotId: spot1?.id,
      startDate: '2024-07-07 09:00:00',
      endDate: '2024-07-07 11:00:00',
    },
    {
      userId: user2?.id,
      parkingSpotId: spot2?.id,
      startDate: '2024-07-07 12:00:00',
      endDate: '2024-07-07 14:00:00',
    },
    {
      userId: user1?.id,
      parkingSpotId: spot3?.id,
      startDate: '2024-07-08 10:00:00',
      endDate: '2024-07-08 12:00:00',
    },
  ]);

  console.log('Seed data has been inserted');
  process.exit();
}

seed().catch((error) => {
  console.error('Failed to seed data:', error);
  process.exit(1);
});
