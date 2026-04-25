import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ServiceType } from '../../../database/models/service.model';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {

  @IsOptional()
  @IsEnum(ServiceType)
  name?: ServiceType;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  duration?: number;
}