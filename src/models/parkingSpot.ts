import { Column, DataType, Default, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'parking_spots',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class ParkingSpot extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}
