import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
const bcrypt = require('bcryptjs');

//import { User } from './model/user';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { SignupInput } from './../auth/dto/inputs/signup.input';
import { PrismaService } from '../core/prisma/prisma.service';
//import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { Roles, User } from '@prisma/client';

@Injectable()
export class UserService {
    private logger: Logger = new Logger('UsersService')


    constructor(private readonly data: PrismaService) {}
  
  

    async create( signupInput: SignupInput ) {
      
      try {
  
        return await this.data.user.create({
            data: {
                ...signupInput,
                isActive: true,
                password: bcrypt.hashSync( signupInput.password, 10 )
            }
          });
  
  
      } catch (error) {
        this.handleDBErrors( error );
      }
  
    }
  
    async findAll( roles: Roles[] ) {
  
      if ( roles.length === 0 ) 
        return this.data.user.findMany({
          // TODO: No es necesario porque tenemos lazy la propiedad lastUpdateBy
          // relations: {
          //   lastUpdateBy: true
          // }
        });
  
      // ??? tenemos roles ['admin','superUser']

      return this.data.user.findMany({
        where: {
            roles: { hasSome: [Roles.superUser,Roles.admin]}
        }
      });
      /* return this.data.user.createQueryBuilder()
        .andWhere('ARRAY[roles] && ARRAY[:...roles]')
        .setParameter('roles', roles )
        .getMany(); */
  
    
    }
  
    async findOneByEmail( email: string ) {
      try {
        return await this.data.user.findUnique({where: { email }});
      } catch (error) {
        throw new NotFoundException(`${ email } not found`);
        // this.handleDBErrors({
        //   code: 'error-001',
        //   detail: `${ email } not found`
        // });
      }
    }
  
    async findOneById( id: string ) {
      try {
        return await this.data.user.findUnique({where: { id }});
      } catch (error) {
        throw new NotFoundException(`${ id } not found`);
      }
    }
  
    async update(
      id: string, 
      updateUserInput: UpdateUserInput,
      updateBy: User
    ) {
  
      try {
        return await this.data.user.update({
            data: {
                ...updateUserInput,
                userId: updateBy.id,
                id
            },
            where: { id }
        })
       
  
      } catch (error) {
        this.handleDBErrors( error );
      }
      
      
    }
  
    async block( id: string, adminUser: User ): Promise<User | undefined> {
      

      try {
        const userToBlock = await this.data.user.findUnique({where: { id }});

        if(userToBlock) {
          userToBlock.isActive = false;
          //userToBlock.lastUpdateBy = { connect: adminUser } ;
          userToBlock.userId = adminUser.id;
          try{
            return await this.data.user.create( { 
              data: {
                ...userToBlock,
                //lastUpdateBy :   {connect: {userId: adminUser.id }}
              }
            });
          } catch (error) {
            this.handleDBErrors( error );
          }
        }
      } catch (error) {
        throw new NotFoundException(`${ id } not found`);
      }
      
  
    }
  
    
    private handleDBErrors( error: any ): never {
  
      
      if (  error.code === '23505' ) {
        throw new BadRequestException( error.detail.replace('Key ','') );
      }
  
      if ( error.code == 'error-001' ) {
        throw new BadRequestException( error.detail.replace('Key ','') );
      }
      
      this.logger.error( error );
  
      throw new InternalServerErrorException('Please check server logs');
  
    }
  
}
