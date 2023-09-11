import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { SignupInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { PrismaService } from '../core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PublicErrors } from 'src/interceptors/public-errors.enum';
import { WhatsappService } from 'src/core/whatsapp/whatsapp.service';


@Injectable()
export class AuthService {

    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly whatsappService: WhatsappService
    ) {}

    /* private getJwtToken( userId: string ) {
        return this.jwtService.sign({ id: userId });
    } */


    async signup( signupInput: SignupInput ): Promise<AuthResponse> {

        const user = await this.prisma.user.create( {
            data: {
                ...signupInput,
                password: bcrypt.hashSync(signupInput.password,8)
            }
        } );

        if(!user){
            throw new BadRequestException({
                code: PublicErrors.INVALID_CREDENTIALS,
                message: `Invalid credentials. Email / Password do not match`,
            });
        }


        //const token = this.getJwtToken( user.id );

        const tokens = this.generateTokens({
            userId: user.id,
        });

        return { ...tokens, user };
    }


    async login( loginInput: LoginInput ): Promise<AuthResponse> {
        
        const { email, password } = loginInput;

        const user = await this.prisma.user.findUnique({ where: { email, } });

        if (!user) {
            throw new NotFoundException({
              code: PublicErrors.INVALID_CREDENTIALS,
              message: `Invalid credentials`,
            });
        }

        //valid password
        if ( !bcrypt.compareSync( password, user.password ) ) {
            throw new BadRequestException({
                code: PublicErrors.INVALID_CREDENTIALS,
                message: `Invalid credentials. Email / Password do not match`,
            });
        }

        const tokens = this.generateTokens({
            userId: user.id,
        });

       //this.smsService.sendSMS('+54925598729', '+5491165404122', 'Te logueaste Seba!'); // 15.485 $
       this.whatsappService.sendMessage(1165404122,"hola Seba");

        //const token = this.getJwtToken( user.id );

        return {
            ...tokens,
            //user
        }
    }


    async validateUser( id: string ): Promise<User> {

        const user = await this.prisma.user.findUnique({ where: { id} });

        if (!user || !user.isActive )
            throw new UnauthorizedException(`User is inactive, talk with an admin`);
        /* else if(user && user.password)
            delete user.password; */

        return user;
    }


    /* revalidateToken( user: User ): AuthResponse {

        const token = this.getJwtToken( user.id );

        return { token, user };

    } */

    async refreshToken(token: string): Promise<AuthResponse> {
        try {
          const { userId } = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_SECRET'),
          });
    
          return this.generateTokens({
            userId,
          });
        } catch (e) {
          throw new UnauthorizedException();
        }
    }

    generateTokens(payload: { userId: string }): AuthResponse {
        return {
          accessToken: this.generateAccessToken(payload),
          refreshToken: this.generateRefreshToken(payload),
        };
    }

    private generateAccessToken(payload: { userId: string }): string {
        return this.jwtService.sign(payload);
    }
    
    private generateRefreshToken(payload: { userId: string }): string {
        return this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_EXPIRE'),
        });
    }

    async getUser( id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException({
              code: PublicErrors.INVALID_CREDENTIALS,
              message: `Invalid credentials`,
            });
        }
        return user;
    }

    getUserFromToken(token: string): Promise<User> {

        const user = this.jwtService.decode(token);

        if (!token || !user) {
            throw new NotFoundException({
              code: PublicErrors.INVALID_CREDENTIALS,
              message: `Invalid credentials. User not Found`,
            });
        }
        return this.getUser(user['userId']) ;
    }

}


