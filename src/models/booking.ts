import { Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { ParkingSpot } from './parkingSpot';
import { User } from './user';

@Table({
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Booking extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    field: 'id',
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  userId!: string;

  @Unique('unique_booking')
  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'start_date',
  })
  startDate!: Date;

  @Unique('unique_booking')
  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'end_date',
  })
  endDate!: Date;

  @Unique('unique_booking')
  @ForeignKey(() => ParkingSpot)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'parking_spot_id',
  })
  parkingSpotId!: string;
}
