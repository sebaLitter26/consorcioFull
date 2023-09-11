import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { Roles } from '@prisma/client';
import { IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';


@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
        @Field(() => ID)
        @IsUUID()
        id: string;
      
        @Field( () => [Roles], { nullable: true })
        @IsArray()
        @IsOptional()
        roles: Roles[];
      
        @Field( () => Boolean, { nullable: true })
        @IsBoolean()
        @IsOptional()
        isActive?: boolean;

        @Field( () => String, { nullable: true })
        @IsOptional()
        userId?: String
}
