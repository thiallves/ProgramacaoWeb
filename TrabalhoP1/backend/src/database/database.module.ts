import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './models/user.model';
import { Barbershop } from './models/barbershop.model';
import { Service } from './models/service.model';
import { Appointment } from './models/appointment.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'barbearia_db',

      models: [User, Barbershop, Service, Appointment],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}