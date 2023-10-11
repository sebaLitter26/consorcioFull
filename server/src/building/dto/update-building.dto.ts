import { Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { IsUUID, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { CreateBuildingDTO } from './create-building.dto';
import { Appartment } from 'src/appartment/model/appartment';

@InputType()
export class UpdateBuildingDTO extends PartialType(CreateBuildingDTO) {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;

}
