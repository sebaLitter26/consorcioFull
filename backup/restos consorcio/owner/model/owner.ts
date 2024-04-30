import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Appartment } from './../../appartment/model/appartment';
import { User } from './../../user/model/user';

@ObjectType()
export class Owner {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  observation: string;

  @Field(() => [Appartment], { nullable: true })
  appartments: Appartment[];

  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => ID,{ nullable: true })
  userId: string;
}
