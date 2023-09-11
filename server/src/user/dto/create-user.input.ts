import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {

    @IsNotEmpty()
    @Field(() => String, { nullable: false })
    @IsEmail()
    email: string;


    @IsNotEmpty()
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Field(() => String, { nullable: false })
    @MinLength(6)
    password: string;
}
