import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/shared/models/base.model';
import PaginatedResponse from '../../shared/functions/pagination';

@ObjectType()
export class Product extends BaseModel {
  /* @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date; */

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  stock: number;

  @Field(() => [String] , { nullable: true })
  images: string[];

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  brand: string;

  /* 
  @Field(() => [cart] ,{ nullable: true })
  cart: cart[]; 
*/
  

}

@ObjectType()
export class ProductConnection extends PaginatedResponse(Product) {}
