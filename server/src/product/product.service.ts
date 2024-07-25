import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Injectable()
export class ProductService {
  constructor(private readonly data: PrismaService) {}

  async getMany() {
    return await this.data.product.findMany({
      //include: { building: true, users: true },
    });
  }

  /* async searchProducts(query, { after, before, first, last }, orderBy) {
    return findManyCursorConnection(
      args =>
        this.data.product.findMany({
          /* include: {
            order: true,
            //usersVoted: true, 
            _count: {
              select: { name: '' },
            },
           
          }, 
          where: {
            description: { contains: query || '' },
            //public: true,
          },  
          orderBy:
            orderBy.field === 'name'
              ? {
                  name: {
                    _count: orderBy.direction,
                  },
                }
              : orderBy
              ? { [orderBy.field]: orderBy.direction }
              : null,
          ...args,
        }),
      () =>
        this.data.product.count({
          where: {
            description: { contains: query || '' },
          },
        }),
      { first, last, before, after }
    );
  } */

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