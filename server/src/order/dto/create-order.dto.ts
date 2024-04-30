import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { IsAlpha, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ProductOnOrder } from '../../product-on-order/model/product-on-order';


@InputType()
export class CreateOrderDTO {

  //@IsNotEmpty()
  @IsUUID()
  @Field(()=> ID, { nullable: false })
  appartmentId: string;

  //@IsNotEmpty()
  /* @IsUUID()
  @Field(()=> ID, { nullable: false })
  userId: string; */

  @IsNotEmpty()
  @Field( () => String, { nullable: false })
  @IsMobilePhone('es-AR')
  phone?: string;

  /* @IsNotEmpty()
  @IsUUID('all',{ each: true })
  @Field(()=> [ID],{ nullable: false })
  cartIds: [string]; */
  
  @IsNotEmpty()
  @Field(type => [ProductOnOrder],{ nullable: true })
  cart?: ProductOnOrder[];

  @IsOptional()
  @Field(()=> String,{ nullable: true })
  observation?: string;

}
