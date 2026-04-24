import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Table
export class User extends Model<UserAttributes> implements UserAttributes {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;
}