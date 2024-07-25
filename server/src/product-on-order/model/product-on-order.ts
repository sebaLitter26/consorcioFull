import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Product } from '../../product/model/product';
import { Order } from '../../order/model/order';
import { BaseModel } from 'src/shared/models/base.model';

@ObjectType()
export class ProductOnOrderEntity extends BaseModel {

  /* @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date; */

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

  @Field(() => Order, { nullable: false })
  order?: Order;

}

