import { Field, ObjectType } from '@nestjs/graphql';
import { User as UserSchema } from '@prisma/client';
import { User } from '../../user/model/user';

@ObjectType()
export class AuthResponse {

    @Field({ description: 'JWT access token' })
    accessToken: string;

    @Field({ description: 'JWT refresh token' })
    refreshToken: string;

    @Field( () => User,{ description: 'User' })
    user?: UserSchema;

}
