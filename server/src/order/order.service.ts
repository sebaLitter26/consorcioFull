import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { Order, User } from '@prisma/client';

@Injectable()
export class OrderService {
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

  async create(data: CreateOrderDTO, customer: User) : Promise<Order | null>{
    console.log(data, customer);

    // idAppartment viene

    return await this.data.order.create({
      data: {
        ...data,
        cart: {
          create: data.cart
        },
        userId: customer.id,
        //include: { ProductOnOrder: true },
      }



    });

    

    //Verifica que el nuevo address sea unico. Que no exista en otro edificio.
    /* if(data.address)
      await this.validateBuilding(data.address);

    data: {
        ...data, 
        appartments: {
          create: appartments
        }
      },
      include: { appartments: true },
    });

      let appartments: Appartment[] = [];
      let LETTERS_APPARTMENT = 'ABCDEF';
      let floor = 0;
      while(data.floors >= floor){
        let letterIndex = 0;
        let maxletter = LETTERS_APPARTMENT.indexOf(data.letter);
        while(letterIndex <= maxletter){
          appartments.push({
            observation: `${floor} - ${LETTERS_APPARTMENT[letterIndex]}`,
            floor,
            letter: `${LETTERS_APPARTMENT[letterIndex]}`,
            id: undefined, 
            createdAt: new Date(), 
            updatedAt: new Date(), 
            //users: [], 
            buildingId: undefined

          });
          letterIndex++;
        }
        floor++;
      }

    return await this.data.building.create({
      data: {
        ...data, 
        appartments: {
          create: appartments
        }
      },
      include: { appartments: true },
    }); */
    /* return await this.data.order.create({
      data
      //include: { building: true, users: true },
    }); */
  }

  async update(data: UpdateOrderDTO) {
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