import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateServiceDto, @Req() req: any) {
    return this.service.create(data, req.user);
  }
  /*create(@Body() dto: CreateServiceDto, @Req() req: any) {
    
    return this.service.create(dto, req.user);
  }*/


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.user);
  }

  // READ ONE
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.service.findOne(Number(id), req.user);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
    @Req() req: any,
  ) {
    return this.service.update(Number(id), dto, req.user);
  }

 
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.service.remove(Number(id), req.user);
  }
}