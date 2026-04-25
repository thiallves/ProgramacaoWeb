import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
  BARBEIRO = 'BARBEIRO',
}

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  barbershopId: number;
}

export interface UserCreationAttributes
  extends Omit<UserAttributes, 'id'> { }

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare barbershopId: number;

  @Column({
    type: DataType.ENUM('ADMIN', 'CLIENTE', 'BARBEIRO'),
    allowNull: false,
    defaultValue: 'CLIENTE',
  })
  declare role: UserRole;
}
