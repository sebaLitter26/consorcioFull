import { Field, ID, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsNumber, IsOptional, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class CreateProductDTO {

  @IsNotEmpty()
  @IsNumber()
  @Max(99999, { message: 'Maximal price allowed is 99999 $'})
  @Min(1, { message: 'Minimal price allowed is 1 $'})
  @Field(()=> Number,{ nullable: false })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(200, { message: 'Maximal stock units alowed is 200'})
  @Min(1, { message: 'Minimal stock units allowed is 1'})
  @Field(()=> Number,{ nullable: false })
  stock: number;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(50, { message: 'Only 50 letters name allowed'})
  @MinLength(5, { message: 'name must have 5 letters at least'})
  @Field(()=> String,{ nullable: false })
  name: string;
  
  @IsOptional()
  @Field(()=> [String],{ nullable: true })
  images: string[];

  @IsNotEmpty()
  @MaxLength(50, { message: 'Only 50 letters brand allowed'})
  @MinLength(2, { message: 'brand must have 2 letters at least'})
  @Field(()=> String,{ nullable: false })
  brand: string;

  @IsOptional()
  @Field(()=> String,{ nullable: true })
  description: string;

}
