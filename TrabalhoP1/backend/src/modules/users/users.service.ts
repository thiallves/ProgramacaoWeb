import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../../database/models/user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async create(data: CreateUserDto, loggedUser: any) {
        const exists = await this.findByEmail(data.email);

        if (exists) {
            throw new BadRequestException('Email já cadastrado');
        }

        if (data.role === 'ADMIN') {
            throw new BadRequestException('Não é permitido criar usuário como ADMIN');
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

    async findAll() {
        return this.userModel.findAll({
            attributes: { exclude: ['password'] },
        });
    }

    async findOne(id: number) {
        const user = await this.userModel.findByPk(id);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        const { password, ...result } = user.toJSON();
        return result;


    }

    async update(id: number, data: UpdateUserDto) {
        const user = await this.userModel.findByPk(id);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        if (data.role && data.role === 'ADMIN') {
            throw new ForbiddenException(
                'Não é permitido se promover para ADMIN',
            );
        }

        await user.update(data);
        const { password, ...result } = user.toJSON();
        return result;
    }

    async remove(id: number) {
        const user = await this.userModel.findByPk(id);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        await user.destroy();

        return { message: 'Usuário removido com sucesso' };
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({
            where: { email },
            /*attributes: { include: ['password'] },*/
        });

    }

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
    async removeWithPermission(userId: number, requester: any) {
        const user = await this.userModel.findByPk(userId);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        // ADMIN pode apagar qualquer um
        if (requester.role === UserRole.ADMIN) {
            await user.destroy();
            return { message: 'Usuário removido com sucesso' };
        }

        // usuário só pode apagar a si mesmo
        if (requester.userId !== userId) {
            throw new ForbiddenException(
                'Você só pode excluir sua própria conta',
            );
        }

        await user.destroy();
        return { message: 'Usuário removido com sucesso' };
    }

}