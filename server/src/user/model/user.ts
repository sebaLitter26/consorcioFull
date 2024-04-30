import { ObjectType, Field, Int, ID, HideField, registerEnumType } from '@nestjs/graphql';
import { Roles } from "@prisma/client";
import { IsEnum } from 'class-validator';
import { Appartment } from '../../appartment/model/appartment';
//import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

registerEnumType( Roles, { name: 'Roles', description: 'Roles validos para el usuario (admin, owner, tenant). ' } )

@ObjectType()
export class User {

  @Field( () => ID )
  id: string;

  @Field( () => String )
  name: string;

  @Field( () => String )
  email: string;

  @Field( () => String , { nullable: true })
  notes?: string;

  /* @HideField()
  password: string; */

  @Field( () => String )
  picture: string;

  @Field( () => String, { nullable: true, description: "Ex: +5491165404122" } )   
  phone?: string;

  @IsEnum(Roles)
  @Field( () => Roles, { description: 'Rol del Usuario'  } )
  rol: Roles;

  @Field( () => Boolean )
  isActive: boolean;

  @Field( () => ID , { nullable: true, description: "Id del ultimo user que llamo a updateUser" })
  modifierId?: string;
  
  //TODO: relaciones
  //@ManyToOne( () => User, (user) => user.lastUpdateBy, { nullable: true, lazy: true })
  //@JoinColumn({ name: 'lastUpdateBy' })
  /* @Field( () => User, { nullable: true, description: 'lastUpdateBy' })
  lastUpdateBy?: User; */

  /* @Field( () => [User] , { nullable: true, description: 'updateBy' })
  updateBy?: User[]; */

  @Field( () => ID, { nullable: true, description: 'appartmentId' })
  appartmentId?: string;

  @Field( () => Appartment, { nullable: true, description: 'appartment' })
  appartment?: Appartment;

  @Field( {nullable: false} )
  createdAt?: Date;

  @Field( { nullable: true } )
  updatedAt?: Date;




}


@ObjectType()
export class UserOAuth {

  @Field( () => ID )
  id: string;

  @Field( () => String )
  name: string;

  @Field( () => String )
  email: string;

  @Field( () => String )
  picture: string;

  @Field( () => Boolean, { nullable: true } )
  email_verified: boolean;

  @Field( () => String )
  sub?: string;
  
  //TODO: relaciones
  //@ManyToOne( () => User, (user) => user.lastUpdateBy, { nullable: true, lazy: true })
  //@JoinColumn({ name: 'lastUpdateBy' })
  

  @Field( () => String )
  updated_at?: Date;

  /* 
  @HideField()
  password: string;

  @IsEnum(Roles)
  @Field( () => [Roles], { description: 'Roles del Usuario'  } )
  roles: Roles[]; 

  @Field( () => User, { nullable: true, description: 'lastUpdateBy' })
  lastUpdateBy?: User;

  @Field( () => [User] , { nullable: true, description: 'updateBy' })
  updateBy?: User[];

  @Field( () => String )
  createdAt?: Date;

  */



}
