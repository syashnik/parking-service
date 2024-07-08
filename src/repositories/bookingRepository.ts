import { Op } from 'sequelize';
import { Service } from 'typedi';
import { Booking } from '../models/booking';

@Service()
export class BookingRepository {
  async findAll() {
    return Booking.findAll();
  }

  async findAllByUserId(userId: string) {
    return Booking.findAll({ where: { userId } });
  }

  async findById(id: string) {
    return Booking.findByPk(id);
  }

  async findConflictingBookings(parkingSpotId: string, startDate: Date, endDate: Date, excludeId?: string) {
    const whereClause: any = {
      parkingSpotId,
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          [Op.and]: [{ startDate: { [Op.lte]: startDate } }, { endDate: { [Op.gte]: endDate } }],
        },
      ],
    };

    if (excludeId) {
      whereClause.id = { [Op.ne]: excludeId };
    }

    return Booking.findOne({ where: whereClause });
  }

  async create(data: Partial<Booking>) {
    return Booking.create(data);
  }

  async update(booking: Booking, data: Partial<Booking>) {
    return booking.update(data);
  }

  async delete(booking: Booking) {
    return booking.destroy();
  }
}
