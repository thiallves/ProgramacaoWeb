import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { ServiceType } from '../../../database/models/service.model';

export class CreateServiceDto {

  @IsEnum(ServiceType)
  name: ServiceType;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  duration: number;
}