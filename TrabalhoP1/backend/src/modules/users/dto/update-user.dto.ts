import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { UserRole } from '../../../database/models/user.model';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsInt()
  barbershopId?: number;
}