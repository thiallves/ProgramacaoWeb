import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { User } from '../../database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../../database/models/user.model';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  // 🔓 CRIAR
  async create(data: CreateUserDto, loggedUser: any) {
    const exists = await this.findByEmail(data.email);

    if (exists) {
      throw new BadRequestException('Email já cadastrado');
    }

    if (data.role === UserRole.ADMIN) {
      throw new BadRequestException(
        'Não é permitido criar usuário como ADMIN',
      );
    }

    const hash = await bcrypt.hash(data.password, 10);

    const user = await this.userModel.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role ?? UserRole.CLIENTE,
      password: hash,
      barbershopId: loggedUser?.barbershopId ?? null,
    });

    const { password, ...result } = user.toJSON();
    return result;
  }

  // 🔐 LISTAGEM COM PAGINAÇÃO + FILTROS (CORRETO)
  async findAll(
    page: number = 1,
    limit: number = 10,
    name?: string,
    role?: string,
  ) {
    const offset = (page - 1) * limit;

    const where: any = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (role) {
      where.role = role;
    }

    const { rows, count } = await this.userModel.findAndCountAll({
      where,
      limit,
      offset,
      attributes: { exclude: ['password'] },
    });

    return {
      data: rows,
      total: count,
      page,
      lastPage: Math.ceil(count / limit),
    };
  }

  // 🔐 BUSCAR POR ID
  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { password, ...result } = user.toJSON();
    return result;
  }

  // 🔐 UPDATE
  async update(id: number, data: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (data.role && data.role === UserRole.ADMIN) {
      throw new ForbiddenException(
        'Não é permitido se promover para ADMIN',
      );
    }

    await user.update(data);

    const { password, ...result } = user.toJSON();
    return result;
  }

  // 🔐 DELETE
  async remove(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await user.destroy();

    return { message: 'Usuário removido com sucesso' };
  }

  // 🔎 BUSCAR POR EMAIL
  async findByEmail(email: string) {
    return this.userModel.findOne({
      where: { email },
    });
  }

  // 🔐 PERMISSÃO UPDATE
  async updateWithPermission(
    targetId: number,
    user: any,
    data: UpdateUserDto,
  ) {
    if (user.role !== UserRole.ADMIN && user.userId !== targetId) {
      throw new ForbiddenException(
        'Você só pode editar sua própria conta',
      );
    }

    return this.update(targetId, data);
  }

  // 🔐 PERMISSÃO DELETE
  async removeWithPermission(userId: number, requester: any) {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (requester.role === UserRole.ADMIN) {
      await user.destroy();
      return { message: 'Usuário removido com sucesso' };
    }

    if (requester.userId !== userId) {
      throw new ForbiddenException(
        'Você só pode excluir sua própria conta',
      );
    }

    await user.destroy();
    return { message: 'Usuário removido com sucesso' };
  }
}