import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateBarbershopDto {

  @ApiProperty({ example: 'Barbearia Central' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Rua A' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Rio de Janeiro' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ example: -22.9, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: -43.2, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;
}