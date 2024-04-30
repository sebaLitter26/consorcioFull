import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../user/model/user';
//import { ValidRoles } from '../enums/valid-roles.enum';
import { Roles } from '@prisma/client';
import { jwtDecode } from 'jwt-decode';



export const CurrentUser = createParamDecorator( 
    ( roles: Roles[] = [], context: ExecutionContext  ) => {


        const ctx = GqlExecutionContext.create( context );
        const request = ctx.getContext().req;
        //const user: User = request.user;

        const usetFromToken: any = jwtDecode(request.headers['authorization']);

        if ( !usetFromToken ) {
            throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`);
        }

        return usetFromToken;

        if ( roles.length === 0 ) return usetFromToken;

        for ( const role of usetFromToken.roles ) {
            // TODO: Eliminar Valid Roles
            if ( roles.includes( role as Roles ) ) {
                return usetFromToken;
            }
        }

        throw new ForbiddenException(
            `User ${ usetFromToken.name } need a valid role [${ roles }]`
        )

})
