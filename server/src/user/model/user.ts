import { ObjectType, Field, Int, ID, HideField, registerEnumType } from '@nestjs/graphql';
import { Roles } from "@prisma/client";
import { IsEnum } from 'class-validator';
//import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

registerEnumType( Roles, { name: 'Roles', description: 'Roles validos para el usuario (admin, user, superUser). ' } )

@ObjectType()
export class User {

  @Field( () => ID )
  id: string;

  @Field( () => String )
  name: string;

  @Field( () => String )
  email: string;

  @HideField()
  password: string;

  @IsEnum(Roles)
  @Field( () => [Roles], { description: 'Roles del Usuario'  } )
  roles: Roles[];

  @Field( () => Boolean, { nullable: true } )
  isActive: boolean;

  @Field( () => String )
  userId?: string;
  
  //TODO: relaciones
  //@ManyToOne( () => User, (user) => user.lastUpdateBy, { nullable: true, lazy: true })
  //@JoinColumn({ name: 'lastUpdateBy' })
  @Field( () => User, { nullable: true, description: 'lastUpdateBy' })
  lastUpdateBy?: User;

  @Field( () => [User] , { nullable: true, description: 'updateBy' })
  updateBy?: User[];

  @Field( () => String )
  createdAt?: Date;

  @Field( () => String )
  updatedAt?: Date;



}
