import { IsString, IsEmail, IsOptional } from 'class-validator';
import { UserRole } from '../../../database/models/user.model';

export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsOptional()
  role?: UserRole;
}