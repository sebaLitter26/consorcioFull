import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateOwnerDTO } from './dto/create-owner.dto';
import { UpdateOwnerDTO } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(private readonly data: PrismaService) {}

  async getMany() {
    return await this.data.owner.findMany({
      include: { user: true, appartments: true },
    });
  }

  async get(id: string) {
    return await this.data.owner.findUnique({
      where: { id },
      include: { user: true, appartments: true },
    });
  }

  async create(data: CreateOwnerDTO) {
    return await this.data.owner.create({
      data,
      include: { user: true, appartments: true },
    });
  }

  async update(data: UpdateOwnerDTO) {
    return await this.data.owner.update({
      where: { id: data.id },
      data,
      include: { user: true, appartments: true },
    });
  }

  async delete(id: string) {
    return await this.data.owner.delete({ where: { id } });
  }
}


// env("DATABASE_URL")