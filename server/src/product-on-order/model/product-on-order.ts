import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Product } from '../../product/model/product';
import { Order } from '../../order/model/order';
import { Entity } from 'typeorm';

@Entity('productOnOrder')
@ObjectType()
export class ProductOnOrder {

  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: false })
  quantity: number;

  @Field({ nullable: false })
  price: number;

  @Field(() => ID, { nullable: false })
  productId: string;

  @Field(() => Product, { nullable: false })
  product: Product;

  @Field(() => ID, { nullable: true })
  orderId?: string;

  @Field(() => Order, { nullable: true })
  order?: Order;

}

