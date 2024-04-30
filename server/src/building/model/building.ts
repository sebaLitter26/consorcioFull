import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Appartment } from '../../appartment/model/appartment';

@ObjectType()
export class Building {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  address: string;

  @Field()
  location: string;

  @Field()
  floors: number;

  @Field()
  letter: string;

  @Field(() => [String] , { nullable: true })
  images: string[];

  @Field(() => [Appartment])
  appartments: Appartment[];
}
