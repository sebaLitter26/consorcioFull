import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProductOnOrderDTO } from './create-product-on-order.dto';

@InputType()
export class UpdateProductOnOrderDTO extends PartialType(CreateProductOnOrderDTO) {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;

  /* @IsNotEmpty()
  @IsUUID()
  @Field(() => [ID], { nullable: false })
  users: string[]; */
}
