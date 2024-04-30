import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProductDTO } from './create-product.dto';

@InputType()
export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;

  /* @IsNotEmpty()
  @IsUUID()
  @Field(() => [ID], { nullable: false })
  users: string[]; */
}
