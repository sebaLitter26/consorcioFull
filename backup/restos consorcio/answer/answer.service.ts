import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateAnswerDTO } from './dto/create-answer.dto';
import { UpdateAnswerDTO } from './dto/update-answer.dto';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class AnswerService {
  constructor(private readonly data: PrismaService) {}

  async getMany(paginationArgs: PaginationArgs, searchArgs: SearchArgs) {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    //en la consulta debe colocarse el answers( search: ""){} o algun parametro en los parentesis, sino answers{} a secas  
    
    const queryBuilder = this.data.answer.findMany({
        skip: offset,
        take: limit,
        where: {
            ...({ content: { contains: `${search?.toLowerCase() }`}  }),
        },
        include: { question: true }
    })
    //.where(`"userId" = :userId`, { userId: user.id });

    /* if ( search ) {
      queryBuilder.where('LOWER(name) like :name', { name: `%${ search.toLowerCase() }%` });
    } */
    return await queryBuilder; //this.data.answer.findMany({  });
  }

  async get(id: string) {
    return await this.data.answer.findUnique({
      where: { id },
      include: { question: true },
    });
  }

  async create(data: CreateAnswerDTO) {
    return await this.data.answer.create({ data, include: { question: true } });
  }

  async update(data: UpdateAnswerDTO) {
    return await this.data.answer.update({
      where: { id: data.id },
      data,
      include: { question: true },
    });
  }

  async delete(id: string) {
    return await this.data.answer.delete({ where: { id } });
  }
}
