import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

export enum AppointmentStatus {
  PENDENTE = 'PENDENTE',
  CONFIRMADO = 'CONFIRMADO',
  CANCELADO = 'CANCELADO',
}

@Table({
  tableName: 'appointments',
})
export class Appointment extends Model<Appointment> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  serviceId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  barbershopId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.ENUM(
      'PENDENTE',
      'CONFIRMADO',
      'CANCELADO'
    ),
    defaultValue: 'PENDENTE',
  })
  status: AppointmentStatus;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}