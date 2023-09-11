import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { ValidRoles } from '../../../auth/enums/valid-roles.enum';
import { Roles } from "@prisma/client";

@ArgsType()
export class ValidRolesArgs {

    @Field( () => [Roles], { nullable: true })
    @IsArray()
    roles: Roles[];
        

}

