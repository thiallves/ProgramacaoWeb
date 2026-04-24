import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BarbershopsService } from './barbershops.service';
import { BarbershopsController } from './barbershops.controller';
import { Barbershop } from '../../database/models/barbershop.model';

@Module({
  imports: [SequelizeModule.forFeature([Barbershop])],
  controllers: [BarbershopsController],
  providers: [BarbershopsService],
})
export class BarbershopsModule {}
