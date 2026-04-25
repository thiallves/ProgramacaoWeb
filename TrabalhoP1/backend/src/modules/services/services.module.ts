import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Service } from '../../database/models/service.model';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';

@Module({
  imports: [SequelizeModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}