import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateTenantDTO } from './create-tenant.dto';

@InputType()
export class UpdateTenantDTO extends PartialType(CreateTenantDTO) {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;
}
