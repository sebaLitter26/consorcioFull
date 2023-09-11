import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateTenantDTO {
  @IsNotEmpty()
  @MaxLength(500, { message: 'Observation is too long. Maximal length is 100 characters'})
  @MinLength(5, { message: 'Observation is too short. Minimal length is 5 characters'})
  @Field({ nullable: false })
  observation: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID, { nullable: false })
  userId: string;
}
