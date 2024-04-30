import { Headers , NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { AuthResponse } from './types/auth-response.type';
import { CurrentUser } from './decorators/current-user.decorator';
import { User, UserOAuth } from '../user/model/user';
import { RefreshTokenInput } from './dto/inputs/refresh-token.input';
import {jwtDecode, JwtPayload } from "jwt-decode";
//import { ValidRoles } from './enums/valid-roles.enum';

@Resolver( () => AuthResponse )
export class AuthResolver {

  constructor(
    private readonly authService: AuthService
  ) {}

  /* @Mutation( () => AuthResponse , { name: 'signup' })
  async signup(
    @Args({ name: 'input', type: () => SignupInput }) data: SignupInput
  ): Promise<AuthResponse> {
    return this.authService.signup( data );
  }

  @Mutation( () => AuthResponse , { name: 'login' })
  async login(
    //@Args('loginInput') loginInput: LoginInput
    @Args({ name: 'input', type: () => LoginInput }) data: LoginInput
  ): Promise<AuthResponse> {
    return this.authService.login( data );
  }

  @Query( () => AuthResponse, { name: 'revalidate'})
  @UseGuards( JwtAuthGuard )// JwtAuthGuard )
  async revalidateToken(
    @Args() { accessToken }: RefreshTokenInput,
    @CurrentUser(   ) user: User
  ): Promise<AuthResponse> {
    return this.authService.refreshToken( accessToken );
  } 
  

  @ResolveField('user', returns => User)
  async user(@Parent() auth: AuthResponse ) { 
    console.log('ResolveField');
    
    return this.authService.getUserFromToken(auth.accessToken);
  }
  */

  @Query( () => User, { name: 'oAuthLogin'})
  //@UseGuards( JwtAuthGuard ) //OAuth2Guard
  
  async oAuthLogin(
    //@CurrentUser( /**[ ValidRoles.admin ] */  ) user: UserOAuth
    //@Headers() headers
    @Args('token') accessToken: string
    /* @Args() { accessToken }: RefreshTokenInput, */
  ){

    try{
      const usetFromToken: any = jwtDecode<JwtPayload>(accessToken);
      //console.log('oAuthLogin', accessToken, usetFromToken);
      return this.authService.validateUserEmail(usetFromToken);
    }catch(error){
      console.log(error);
      

    }
    
    
    //this.authService.validateUserEmail()
    
    
  }
   /*  @Args() { token }: RefreshTokenInput,
    @CurrentUser( /**[ ValidRoles.admin ]   ) user: User
  ): Promise<AuthResponse> {
    return this.authService.refreshToken( token );
  } */

}