
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//import { User } from '../../user/model/user';
import { JwtPayload } from '../intefaces/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';


@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        private readonly authService: AuthService
    ) {
        
        super({
            secretOrKey: process.env.JWT_SECRET, //configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate( payload: any/* JwtPayload */ ): Promise<User> {
        
        //const { email } = payload;
        
        const user = await this.authService.validateUserEmail( payload );

        console.log('JwtStrategy', payload, user);

        return user ; // req.user

    }


}
