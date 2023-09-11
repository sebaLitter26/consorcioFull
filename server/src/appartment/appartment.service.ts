import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateAppartmentDTO } from './dto/create-appartment.dto';
import { UpdateAppartmentDTO } from './dto/update-appartment.dto';

@Injectable()
export class AppartmentService {
  constructor(private readonly data: PrismaService) {}

  async getMany() {
    return await this.data.appartment.findMany({
      include: { building: true, owner: true, tenant: true },
    });
  }

  async get(id: string) {
    return await this.data.appartment.findUnique({
      where: { id },
      include: { building: true, owner: true, tenant: true },
    });
  }

  async create(data: CreateAppartmentDTO) {

    return await this.data.appartment.create({
      data,
      include: { building: true, owner: true, tenant: true },
    });
  }

  async update(data: UpdateAppartmentDTO) {
    return await this.data.appartment.update({
      where: { id: data.id },
      data,
      include: { building: true, owner: true, tenant: true },
    });
  }

  async delete(id: string) {
    return await this.data.appartment.delete({ where: { id } });
  }
}