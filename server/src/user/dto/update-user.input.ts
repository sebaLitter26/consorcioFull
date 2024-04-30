import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { Roles } from '@prisma/client';
import { IsBoolean, IsMobilePhone, IsOptional, IsUUID } from 'class-validator';


@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
        @Field(() => ID)
        @IsUUID()
        id: string;

        @Field(() => ID, { nullable: false })
        @IsUUID()
        modifierId: string;

        @Field( () => ID, { nullable: false })
        @IsUUID()
        //@IsOptional()
        appartmentId: string;

        /* @Field( () => Appartment, { nullable: true })
        @IsOptional()
        appartment?: Appartment */
      
        @Field( () => Roles, { nullable: true })
        @IsOptional()
        rol: Roles;
      
        @Field( () => Boolean, { nullable: true })
        @IsBoolean()
        @IsOptional()
        isActive?: boolean;

        @Field( () => String, { nullable: true })
        @IsOptional()
        @IsMobilePhone('es-AR')
        phone?: string
}
