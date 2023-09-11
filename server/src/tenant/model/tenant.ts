import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/model/user';
import { Appartment } from 'src/appartment/model/appartment';

@ObjectType()
export class Tenant {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  observation: string;

  @Field(() => [Appartment], { nullable: true })
  appartment: Appartment[];

  @Field(() => User, { nullable: true })
  user: User;

  @Field({ nullable: true })
  userId: string;
}
