import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { Service } from '../../database/models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service)
    private serviceModel: typeof Service,
  ) { }


  async create(data: CreateServiceDto, user: any) {
    console.log('USER DO JWT:', user);
    if (!user.barbershopId) {
      throw new ForbiddenException('Usuário não pertence a uma barbearia');
    }

    return this.serviceModel.create({
      ...data,
      barbershopId: user.barbershopId,
    });
  }


  async findAll(user: any) {
    return this.serviceModel.findAll({
      where: {
        barbershopId: user.barbershopId,
      },
    });
  }


  async findOne(id: number, user: any) {
    const service = await this.serviceModel.findOne({
      where: {
        id,
        barbershopId: user.barbershopId,
      },
    });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return service;
  }


  async update(id: number, data: UpdateServiceDto, user: any) {
    const service = await this.serviceModel.findOne({
      where: {
        id,
        barbershopId: user.barbershopId,
      },
    });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    await service.update(data);

    return service;
  }


  async remove(id: number, user: any) {
    const service = await this.serviceModel.findOne({
      where: {
        id,
        barbershopId: user.barbershopId,
      },
    });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    await service.destroy();

    return { message: 'Serviço removido com sucesso' };
  }
}