import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, LOCAL_STORAGE_TOKEN } from 'src/app/modules/authentication/services/authentication.service';

import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { SignInResponse } from '../../../main';
import { User, AuthService, IdToken } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    /* formLoginGroup = this.fb.group({
        /** `FormControl` con el tipo de legajo a filtrar. 
        userControl: ['john.doe@example.com',[Validators.required, Validators.minLength(10)]],

        passwordControl: ['secret', [Validators.required, Validators.minLength(5)]],
    }); 
    */
    /** El usuario. Actualmente se usa el número de legajo. */
    //username: string | null = null;

    /** La clave del usuario. */
    //password: string | null = null;

    /** Función que se ejecuta al presionar enter al estar enfocado sobre el campo de usuario o contraseña. */
   /*  keyDownCallback: (keyboardEvent: KeyboardEvent) => void = (keyboardEvent) => {
        if (keyboardEvent.key == "Enter") {
            keyboardEvent.preventDefault();
            this.signIn();
        }
    } */

    /** Flag que indica si se está realizando una petición. */
    fetching: boolean = false;
    identification: IdToken | null = null;
    isAuthenticated = false;

    constructor(
        private authenticationService: AuthenticationService,
        private snackBarService: SnackBarService,
        private router: Router,
        private activatedRoute: ActivatedRoute, 
        private profileService: ProfileService,
        private fb: FormBuilder,
        @Inject(DOCUMENT) public document: Document, 
        public authService: AuthService
    ) {}

    ngOnInit(): void {


       /*  this.identification = this.activatedRoute.snapshot.queryParams as User;
        console.log(this.identification);
        if(!this.identification.identities.user_id){
            this.identification = undefined;
            return;
        }else{
            console.log(this.identification);
        } */

        /* this.authService.isAuthenticated$.subscribe((success: boolean) => {
            this.isAuthenticated = success;
            console.log(success);
            
            //console.log(this.activatedRoute.snapshot.queryParams);
            
          }); */

        this.authService.idTokenClaims$.subscribe(token => {
            
            if(token){
                this.identification = token;
                
                this.fetching = true;
                this.authenticationService.OAuthLogin(this.identification.__raw).subscribe({
                    next:(user: SignInResponse) => {
                        this.fetching = false;
                        console.log('backSession response',user);
                        
                        
                        localStorage.setItem(LOCAL_STORAGE_TOKEN, user.token ?? "");
                        this.profileService.setupUser(user.user);
                        
                        //this.router.navigate([""]);
                    },
                    error:(error: HttpErrorResponse) => {
                        this.fetching = false;
                        this.snackBarService.open(`Error al iniciar sesión. ${error.message}`, "Aceptar", 5000, "error-snackbar");
                    }
                });
            }
            
        });

        
        //localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        //this.profileService.killUser();
    }

    /* signIn(): void {
        if (!this.formLoginGroup.invalid && !this.fetching) {
            this.fetching = true;
            const form = this.formLoginGroup.controls;
            this.authenticationService.signIn(form.userControl.value ?? '', form.passwordControl.value?? '').subscribe({
                next:(user: SignInResponse) => {
                    this.fetching = false;
                    this.router.navigate([""]);
                },
                error:(error: HttpErrorResponse) => {
                    this.fetching = false;
                    this.snackBarService.open(`Error al iniciar sesión. ${error.message}`, "Aceptar", 5000, "error-snackbar");
                }
            });
        }
    } */


    backSession(identification:User): void {
        
        
    }
}
