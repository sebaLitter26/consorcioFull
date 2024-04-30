import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateOrderDTO } from './create-order.dto';

@InputType()
export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;

  /* @IsNotEmpty()
  @IsUUID()
  @Field(() => [ID], { nullable: false })
  users: string[]; */
}
