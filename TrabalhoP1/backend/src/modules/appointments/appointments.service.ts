import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from '../../database/models/appointment.model';
@Injectable()
export class AppointmentsService {

  constructor(
    @InjectModel(Appointment)
    private model: typeof Appointment,
  ) {}

  async create(dto) {

    const date = new Date(dto.date);

    if (date < new Date()) {
      throw new BadRequestException('Data inválida');
    }

    const exists = await this.model.findOne({ where: { date } });

    if (exists) {
      throw new BadRequestException('Horário ocupado');
    }

    return this.model.create({
      ...dto,
      status: 'PENDENTE'
    });
  }

  async findAll(page, limit, status) {

    const offset = (page - 1) * limit;

    return this.model.findAndCountAll({
      where: status ? { status } : {},
      limit,
      offset,
    });
  }
}