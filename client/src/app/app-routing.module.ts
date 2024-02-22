import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AuthenticationGuardService } from './modules/authentication/guards/authentication-guard.service';
//import { DialogsModule } from './modules/ui/dialogs/dialogs.module';


const routes: Routes = [
    /* {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign',
      }, */
    {
        path: 'sign',
        loadChildren: () => import('./modules/routes/sign/sign.module').then(m => m.SignModule),
    },
    {
        path: '',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
        canActivate: [ AuthenticationGuardService ],  //AuthenticationGuardService  AuthGuard
    },
    {
        path: '**',
        redirectTo: '/sign/in',
        //pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { 
            useHash: true,
            enableTracing: false, // <-- debugging purposes only
        }),
        AuthenticationModule,
        //DialogsModule
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
