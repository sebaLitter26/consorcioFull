import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateProductOnOrderDTO } from './dto/create-product-on-order.dto';
import { UpdateProductOnOrderDTO } from './dto/update-product-on-order.dto';
import { User } from '@prisma/client';

@Injectable()
export class ProductOnOrderService {
  constructor(private readonly data: PrismaService) {}

  async getMany() {
    return await this.data.order.findMany({
      //include: { building: true, users: true },
    });
  }

  async get(id: string) {
    return await this.data.order.findUnique({
      where: { id },
      //include: { building: true, users: true },
    });
  }

  async create(data: CreateProductOnOrderDTO, customer: User) {
    console.log(data);
    return;
    /* return await this.data.order.create({
      data
      //include: { building: true, users: true },
    }); */
  }

  async update(data: UpdateProductOnOrderDTO) {
    console.log(data);
    return;
    
    /* return await this.data.order.update({
      where: { id: data.id },
      data:{
        ...data,
        appartment: { connect: { id: data.appartmentId } },
        customer: { connect: { id: data.userId } },
      }
      //include: { building: true },
    }); */
  }

  async delete(id: string) {
    return await this.data.order.delete({ where: { id } });
  }
}