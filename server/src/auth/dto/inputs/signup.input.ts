import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { LoginInput } from './login.input';

@InputType()
export class SignupInput  {  //extends PartialType(LoginInput) 

    @Field( () => String )
    @IsEmail()
    email: string;

    @Field( () => String )
    @IsNotEmpty()
    name: string;

    @Field( () => String )
    @MinLength(6)
    picture: string;

}