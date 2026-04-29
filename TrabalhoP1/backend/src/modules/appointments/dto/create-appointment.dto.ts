import { IsNumber, IsDateString } from 'class-validator';

export class CreateAppointmentDto {

  @IsNumber()
  userId: number;

  @IsNumber()
  serviceId: number;

  @IsNumber()
  barbershopId: number;

  @IsDateString()
  date: string;
}