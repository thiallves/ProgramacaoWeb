import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../../database/models/user.model';
import { IsEmail } from 'class-validator';

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '21999999999' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 11)
  phone: string;

  @ApiProperty({ example: 'ADMIN, CLIENTE ou BARBEIRO' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}