import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Appartment } from '../../appartment/model/appartment';

@ObjectType()
export class Building {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  floors: number;

  @Field({ nullable: true })
  letter: string;

  @Field(() => [String] , { nullable: true })
  images: string[];

  @Field(() => [Appartment] , { nullable: true })
  appartments: Appartment[];
}
