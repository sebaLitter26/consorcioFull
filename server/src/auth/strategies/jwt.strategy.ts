import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//import { User } from '../../user/model/user';
import { JwtPayload } from '../intefaces/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';


@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        private readonly authService: AuthService,

        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate( payload: JwtPayload ): Promise<User> {

        const { id } = payload;
        
        const user = await this.authService.validateUser( id );

        return user ; // req.user

    }


}
