import { Field, ID, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsNumber, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class CreateAppartmentDTO {

  @IsNotEmpty()
  @IsNumber()
  @Max(9, { message: 'Maximal floors alowed is 9 floors'})
  @Min(2, { message: 'Minimal floors alowed is 2 floors'})
  @Field(()=> Number,{ nullable: true })
  floor: number;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(1, { message: 'Only one letter allowed'})
  @Field(()=> String,{ nullable: true })
  letter: string;
  
  @IsNotEmpty()
  @MaxLength(500, { message: 'Observation is too long. Maximal length is 500 characters'})
  @MinLength(5, { message: 'Observation is too short. Minimal length is 5 characters'})
  @Field({ nullable: false })
  observation: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(()=> ID,{ nullable: false })
  buildingId: string;

}
