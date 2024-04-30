import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateProductOnOrderDTO {

  //@IsNotEmpty()
  @IsUUID()
  @Field(()=> ID, { nullable: false })
  productId?: string;

  //@IsNotEmpty()
  @IsUUID()
  @Field(()=> ID, { nullable: false })
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(99999, { message: 'Maximal price allowed is 99999 $'})
  @Min(1, { message: 'Minimal price allowed is 1 $'})
  @Field(()=> Number,{ nullable: false })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(200, { message: 'Maximal quantity units alowed is 20'})
  @Min(1, { message: 'Minimal quantity units allowed is 1'})
  @Field(()=> Number,{ nullable: false })
  quantity: number;


}
