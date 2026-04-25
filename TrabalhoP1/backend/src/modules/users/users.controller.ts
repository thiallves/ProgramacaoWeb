import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { Request } from 'express';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../database/models/user.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  //  Público
  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  create(@Body() body: CreateUserDto, @Req() req: any) {
    return this.service.create(body, req.user);
  }

  // Qualquer usuário autenticado
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Listar usuários (logado)' })
  findAll() {
    return this.service.findAll();
  }

  // Qualquer usuário autenticado
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID (logado)' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  // Qualquer usuário autenticado
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() body: CreateUserDto,
    @Req() req: any,
  ) {
    return this.service.updateWithPermission(
      Number(id),
      req.user,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Req() req: any,
  ) {
    return this.service.updateWithPermission(
      Number(id),
      req.user,
      body,
    );
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.service.removeWithPermission(
      Number(id),
      req.user,
    );
  }

}