import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import {Service} from './service.model'
interface BarbershopAttributes {
    id?: number;
    name: string;
    address: string;
    city: string;
    latitude?: number;
    longitude?: number;
}

@Table
export class Barbershop extends Model<BarbershopAttributes> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    city: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    neighborhood: string;

    @Column(DataType.FLOAT)
    latitude: number;

    @Column(DataType.FLOAT)
    longitude: number;

    @HasMany(() => Service)
    services: Service[];
}