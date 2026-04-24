import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBarbershopDto {

    @ApiPropertyOptional({ example: 'Barbearia Central' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'Rua A' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({ example: 'Rio de Janeiro' })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({ example: 'Centro' })
    @IsOptional()
    @IsString()
    neighborhood?: string;

    @ApiPropertyOptional({ example: -22.9 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    latitude?: number;

    @ApiPropertyOptional({ example: -43.2 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    longitude?: number;
}