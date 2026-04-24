import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Barbershop } from '../../database/models/barbershop.model';
import { CreateBarbershopDto } from './dto/create-barbershop.dto';
import { FilterBarbershopDto } from './dto/filter-barbershop.dto';
import { UpdateBarbershopDto } from './dto/update-barbershop.dto';
import { Op, Sequelize } from 'sequelize';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BarbershopsService {
    constructor(
        @InjectModel(Barbershop)
        private barbershopModel: typeof Barbershop,
    ) { }

    create(data: CreateBarbershopDto) {
        return this.barbershopModel.create(data);
    }

    async findAll(filters: FilterBarbershopDto) {
        const { page = 1, limit = 10, city, name, neighborhood } =  filters;

        const where: any = {};

        if (city) {
            where.city = city;
        }

        if (name) {
            where.name = name;
        }

        if (neighborhood) {
            where.neighborhood = neighborhood;
        }

        return await this.barbershopModel.findAndCountAll({
            where,
            limit,
            offset: (page - 1) * limit,
        });
    }

    async findOne(id: number) {
        const barbershop = await this.barbershopModel.findByPk(id);

        if (!barbershop) {
            throw new NotFoundException('Barbearia nao encontrada');
        }

        return barbershop;
    }

    async update(id: number, data: UpdateBarbershopDto) {
        const barbershop = await this.barbershopModel.findByPk(id);

        if (!barbershop) {
            throw new NotFoundException('Barbearia nao encontrada');
        }

        await barbershop.update(data);
        return barbershop;
    }

    async remove(id: number) {
        const barbershop = await this.barbershopModel.findByPk(id);

        if (!barbershop) {
            throw new NotFoundException('Barbearia nao encontrada');
        }

        await barbershop.destroy();

        return { message: 'Removido com sucesso' };
    }

    async findNearby(lat: number, lng: number, radius = 5) {
        return this.barbershopModel.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.literal(`
            (6371 * acos(
              cos(radians(${lat}))
              * cos(radians(latitude))
              * cos(radians(longitude) - radians(${lng}))
              + sin(radians(${lat}))
              * sin(radians(latitude))
            ))
          `),
                        'distance',
                    ],
                ],
            },
            order: [[Sequelize.literal('distance'), 'ASC']],
        });
    }
}