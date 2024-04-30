import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Building } from './../../building/model/building';
import { User } from '../../user/model/user';

@ObjectType()
export class Appartment {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  floor: number;

  @Field({ nullable: true })
  letter: string;

  @Field({ nullable: true })
  observation: string;

  /* @Field(() => Owner, { nullable: true })
  owner: Owner;

  @Field({ nullable: true })
  ownerId: string;

  @Field(() => Tenant, { nullable: true })
  tenant: Tenant;


*/
  @Field(() => [User] ,{ nullable: true })
  users: User[]; 

  @Field(() => Building, { nullable: true })
  building: Building;

  @Field(() => ID,{ nullable: true })
  buildingId: string;

  /* @Field(() => [Order] ,{ nullable: true })
  orders: Order[];  */
}
