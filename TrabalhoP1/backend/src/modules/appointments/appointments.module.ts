import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Appointment } from '../../database/models/appointment.model';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [SequelizeModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}