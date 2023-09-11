import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsNumber, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class CreateBuildingDTO {
  @IsNotEmpty()
  @MaxLength(100, { message: 'Direccion is too long. Maximal length is 100 characters'})
  @MinLength(5, { message: 'Direccion is too short. Minimal length is 5 characters'})
  //@Length(min: number, max?: number)
  @Field({ nullable: true })
  address: string;

  @IsNotEmpty()
  @MaxLength(100, { message: 'Location is too long. Maximal length is 100 characters'})
  @MinLength(5, { message: 'Location is too short. Minimal length is 5 characters'})
  @Field({ nullable: true })
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(9, { message: 'Maximal floors alowed is 9 floors'})
  @Min(2, { message: 'Minimal floors alowed is 2 floors'})
  @Field(()=> Number,{ nullable: true })
  floors: number;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(1, { message: 'Only one letter allowed'})
  @Field(()=> String,{ nullable: true })
  letter: string;

  @IsOptional()
  @Field(()=> [String],{ nullable: true })
  images: string[];
}
