import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateTenantDTO } from './dto/create-tenant.dto';
import { UpdateTenantDTO } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private readonly data: PrismaService) {}

  async getMany() {
    return await this.data.tenant.findMany({
      include: { user: true, appartments: true },
    });
  }

  async get(id: string) {
    return await this.data.tenant.findUnique({
      where: { id },
      include: { user: true, appartments: true },
    });
  }

  async create(data: CreateTenantDTO) {
    return await this.data.tenant.create({
      data,
      include: { user: true, appartments: true },
    });
  }

  async update(data: UpdateTenantDTO) {
    return await this.data.tenant.update({
      where: { id: data.id },
      data,
      include: { user: true, appartments: true },
    });
  }

  async delete(id: string) {
    return await this.data.tenant.delete({ where: { id } });
  }
}