
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { SessionSerializer } from './strategies/serializer';
import { JwtModule } from '@nestjs/jwt';

/* import { UserModule } from './../user/user.module';
import { UserService } from '../user/user.service'; */

@Module({
  //controllers: [AuthResolver],
  providers: [
    JwtStrategy,
    SessionSerializer,
    AuthService,
    AuthResolver
  ],
  exports: [ JwtStrategy, PassportModule, JwtModule ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      }
        
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    /* ,
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          }
        })
    }), */

    //UserModule,


  ]
})
export class AuthModule {}
