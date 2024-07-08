import { Column, DataType, Default, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    field: 'id',
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'first_name',
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'last_name',
  })
  lastName!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email',
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'role',
  })
  role!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'token',
  })
  token!: string;
}
