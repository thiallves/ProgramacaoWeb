import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly service;
    constructor(service: ServicesService);
    create(data: CreateServiceDto, req: any): Promise<import("../../database/models/service.model").Service>;
    findAll(req: any): Promise<import("../../database/models/service.model").Service[]>;
    findOne(id: string, req: any): Promise<import("../../database/models/service.model").Service>;
    update(id: string, dto: UpdateServiceDto, req: any): Promise<import("../../database/models/service.model").Service>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
