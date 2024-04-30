import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Appartment, Building } from '@prisma/client';
import { PrismaService } from './../core/prisma/prisma.service';
import { PublicErrors } from './../interceptors/public-errors.enum';
import { CreateBuildingDTO } from './dto/create-building.dto';
import { UpdateBuildingDTO } from './dto/update-building.dto';

@Injectable()
export class BuildingService {
  constructor(private readonly data: PrismaService) {}

  async getMany() {
    return await this.data.building.findMany({
      include: { appartments: true },
    });
  }

  async get(id: string) {
    const building = await this.data.building.findUnique({
      where: { id },
      include: { appartments: true },
    });

    if (!building) {
      throw new NotFoundException({
        code: PublicErrors.INVALID_CREDENTIALS,
        message: `Building dont exist`,
      });
    }
    return building;
  }

  async create(data: CreateBuildingDTO) {

    //Verifica que el nuevo address sea unico. Que no exista en otro edificio.
    if(data.address)
      await this.validateBuilding(data.address);

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
    });
  }

  async update(data: UpdateBuildingDTO) {
    //const building = await this.getBuilding(data.id);

    //Verifica que el nuevo address sea unico. Que no exista en otro edificio.
    //if(data.address) await this.validateBuilding(data.address);

    return await this.data.building.update({
      where: { id: data.id },
      data,
      include: { appartments:  true  },
    });
  }

  /* async upsert(data: UpdateBuildingDTO | CreateBuildingDTO) {

    //Verifica que el nuevo address sea unico. Que no exista en otro edificio.
    if(data.address)
      this.validateBuilding(data.address);

    return await this.data.building.upsert({
      where: { id: data.id },
      update: data,
      create: data,
      include: { appartments:  true  },
    });
  } */

  async delete(id: string) {
    //const building = await this.getBuilding(id);

    return await this.data.building.delete({ 
      where: { id },
      include: { appartments:  true  },
    });
  }


  async getBuilding( id: string): Promise<Building> {
    const building = await this.data.building.findUnique({ where: { id } });

    if (!building) {
        throw new NotFoundException({
          code: PublicErrors.INVALID_CREDENTIALS,
          message: `Building dont exist`,
        });
    }
    return building;
  }

  async validateBuilding( address: string): Promise<Building> {
    const building = await this.data.building.findUnique({ where: { address } });

    
    if (building) {
      console.error(`ERROR DUPLICATED ADDRESS `,building.address);
      throw new NotFoundException({
        code: PublicErrors.DUPLICATED,
        message: `Duplicated address.`,
      });
    }
    return building;
  }
}
