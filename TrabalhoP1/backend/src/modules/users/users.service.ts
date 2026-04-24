import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async create(data: CreateUserDto) {
        return this.userModel.create(data);
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({
            where: { email },
        });
    }

    async findById(id: number) {
        return this.userModel.findByPk(id);
    }
}