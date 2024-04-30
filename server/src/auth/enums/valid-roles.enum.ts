
import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {
    admin     = 'admin', 
    tenant    = 'tenant',  
    owner     = 'owner'
}

registerEnumType( ValidRoles, { name: 'Roles', description: 'Roles validos para el usuario (admin, inquilino, propietario). ' } )


