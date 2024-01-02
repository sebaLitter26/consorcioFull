import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

//import { User } from '../../user/model/user';
import { JwtPayload } from '../intefaces/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';


@Injectable()
export class Oauth2Strategy extends PassportStrategy( Strategy ) {

    constructor(
        private readonly authService: AuthService
    ) {

        super(process.env.oauth2);
    }

    async validate( payload: JwtPayload ): Promise<User> {

        console.log('validate' , payload);
        
        const { id } = payload;
        
        const user = await this.authService.validateUser( id );

        return user ; // req.user

    }


}
