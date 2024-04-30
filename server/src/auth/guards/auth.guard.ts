import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import {jwtDecode} from 'jwt-decode';
//import { OAuth2Client } from 'google-auth-library';


export class JwtAuthGuard extends AuthGuard('jwt') {

    //! Override
    /* getRequest( context: ExecutionContext ) {

        const ctx = GqlExecutionContext.create( context );
        const request = ctx.getContext().req;
        const payload = jwtDecode(request.body.variables.token);
        console.log( 'getRequest', payload); 
        
        return payload;
    } */

    async canActivate(context: ExecutionContext) {
        //const activate = (await super.canActivate(context)) as boolean;
        //const response = context.switchToHttp().getRequest();

        const ctx = GqlExecutionContext.create( context );

        //const request = context.switchToHttp().getRequest();

        const request = ctx.getContext().req;
      
        const usetFromToken: any = jwtDecode(request.headers['authorization']);
        
        return usetFromToken.email;

        
        
        //await super.logIn(response);
        //return usetFromToken.email ?? false;
        //return response;
    }
}


@Injectable()
export class OAuth2Guard extends AuthGuard('oauth2') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const response = context.switchToHttp().getResponse();
    console.log(response); 
    
    //await super.logIn(response);
    return activate; 
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.isAuthenticated();
  }
}

@Injectable()
export class GraphQLAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
}