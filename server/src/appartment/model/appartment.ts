import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owner/model/owner';
import { Tenant } from 'src/tenant/model/tenant';
import { Building } from 'src/building/model/building';

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

  @Field(() => Owner, { nullable: true })
  owner: Owner;

  @Field({ nullable: true })
  ownerId: string;

  @Field(() => Tenant, { nullable: true })
  tenant: Tenant;

  @Field({ nullable: true })
  tenantId: string;

  @Field(() => Building, { nullable: true })
  building: Building;

  @Field({ nullable: true })
  buildingId: string;
}
