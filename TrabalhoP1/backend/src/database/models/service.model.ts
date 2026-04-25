import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Barbershop } from '../models/barbershop.model';

export enum ServiceType {
  CORTE_MAQUINA = 'CORTE_MAQUINA',
  CORTE_TESOURA = 'CORTE_TESOURA',
  BARBA = 'BARBA',
}

interface ServiceAttributes {
  id?: number;
  name: ServiceType;
  price: number;
  duration: number;
  barbershopId: number;
}

interface ServiceCreationAttributes
  extends Omit<ServiceAttributes, 'id'> {}

@Table
export class Service extends Model<
  ServiceAttributes,
  ServiceCreationAttributes
> {

  @Column({
    type: DataType.ENUM(...Object.values(ServiceType)),
    allowNull: false,
  })
  name: ServiceType;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duration: number;


  @ForeignKey(() => Barbershop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  barbershopId: number;

  @BelongsTo(() => Barbershop)
  barbershop: Barbershop;
}