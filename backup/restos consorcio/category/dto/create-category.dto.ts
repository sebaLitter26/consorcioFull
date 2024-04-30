import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCategoryDTO {
  @IsNotEmpty()
  @MaxLength(100, { message: 'Name is too long. Maximal length is 100 characters'})
  @MinLength(5, { message: 'Name is too short. Minimal length is 5 characters'})
  @Field({ nullable: true })
  name: string;
}
