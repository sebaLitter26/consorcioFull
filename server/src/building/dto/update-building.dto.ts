import { Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { CreateBuildingDTO } from './create-building.dto';

@InputType()
export class UpdateBuildingDTO extends PartialType(CreateBuildingDTO) {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;
}
