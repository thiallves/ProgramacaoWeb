import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';

import { BarbershopsService } from './barbershops.service';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { FilterBarbershopDto } from './dto/filter-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Barbershops')
@Controller('barbershops')
export class BarbershopsController {
  constructor(private readonly service: BarbershopsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova barbearia' })
  create(@Body() body: CreateBarbershopDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar barbearias com filtros e paginação' })
  findAll(@Query() query: FilterBarbershopDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar barbearia por ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar completamente a barbearia' })
  replace(
    @Param('id') id: string,
    @Body() body: CreateBarbershopDto,
  ) {
    return this.service.update(Number(id), body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar parcialmente a barbearia' })
  update(
    @Param('id') id: string,
    @Body() body: UpdateBarbershopDto,
  ) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover barbearia' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}