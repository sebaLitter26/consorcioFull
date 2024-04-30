import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

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
