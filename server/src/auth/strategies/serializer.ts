/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { SignupInput } from '../dto/inputs/signup.input';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService
  ) {
    super();
  }

  serializeUser(user: SignupInput, done: Function) {
    console.log('Serializer User');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.validateUserEmail(payload);
    console.log('Deserialize User');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}