import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateAppartmentDTO } from './create-appartment.dto';

@InputType()
export class UpdateAppartmentDTO extends PartialType(CreateAppartmentDTO) {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;

  /* @IsNotEmpty()
  @IsUUID()
  @Field(() => [ID], { nullable: false })
  users: string[]; */
}
