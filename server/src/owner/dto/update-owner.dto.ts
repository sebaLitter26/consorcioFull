import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateOwnerDTO } from './create-owner.dto';

@InputType()
export class UpdateOwnerDTO extends PartialType(CreateOwnerDTO) {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;
}
