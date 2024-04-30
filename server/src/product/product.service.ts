import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly data: PrismaService) {}

  async getMany() {
    return await this.data.product.findMany({
      //include: { building: true, users: true },
    });
  }

  async get(id: string) {
    return await this.data.product.findUnique({
      where: { id },
      //include: { building: true, users: true },
    });
  }

  async create(data: CreateProductDTO) {

    return await this.data.product.create({
      data,
      //include: { building: true, users: true },
    });
  }

  async update(data: UpdateProductDTO) {
    return await this.data.product.update({
      where: { id: data.id },
      data,
      //include: { building: true },
    });
  }

  async delete(id: string) {
    return await this.data.product.delete({ where: { id } });
  }
}