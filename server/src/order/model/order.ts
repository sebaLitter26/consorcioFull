import { Field, ID, ObjectType } from '@nestjs/graphql';
//import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appartment } from '../../appartment/model/appartment';
import { User } from '../../user/model/user';
import { ProductOnOrderEntity } from '../../product-on-order/model/product-on-order';

//@Entity('order')
@ObjectType()
export class Order {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: false })
  phone: number;

  @Field(() => ID, { nullable: false })
  userId: string;

  @Field(() => User, { nullable: false })
  user: User;

  @Field(() => ID, { nullable: true })
  appartmentId?: string;

  @Field(() => Appartment, { nullable: false })
  appartment: Appartment;
  
  @Field(() => String , { nullable: true })
  observation: string;

  /* @Field(() => ID, { nullable: true })
  cartIds?: string; */

  //@OneToMany( () => ProductOnOrderEntity, (product) => product.orderId )
  //@Field(() => [ProductOnOrderEntity] ,{ nullable: false })
  cart: ProductOnOrderEntity[]; 

}


