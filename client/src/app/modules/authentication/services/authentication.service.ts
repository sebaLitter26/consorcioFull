import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { SignInResponse } from '../../main';
import { ProfileService } from '../../main/services/profile.service';
import { EncryptService } from 'src/app/services/encrypt.service';
import { environment } from 'src/environments/environment';
import { RegisterData, UserSignIn } from '..';
import { Apollo } from 'apollo-angular';
import { login, oauthLogin, registerData } from './graphql';
import { IdToken, User } from '@auth0/auth0-angular';

export const LOCAL_STORAGE_TOKEN: string = "consorcio_token";

@Injectable()
export class AuthenticationService {

  constructor(
      private apollo: Apollo,
      private profileService: ProfileService,
      private encryptService: EncryptService,
      private http: HttpClient
  ) { }

  /**
   * Inicia sesión con un usuario.
   * @param username el legajo del usuario
   * @param password la password del usuario
   * @returns un `Observable` con un `SignInResponse` que tiene toda la información del usuario
   */
  signIn(username: string, password: string): Observable<SignInResponse> {
      const userSignIn: UserSignIn = {
          email: username,
          password,
      }

      return this.encryptService.getBase64EncryptedStringAsync(password).pipe(
          tap(encryptedPassword => {
              //userSignIn.password = encryptedPassword;
          }),
          switchMap(encryptedPassword => this.login(userSignIn)), //this.http.post<SignInResponse>(`${environment.apiUrl}auth/email/login`, userSignIn)),
          tap((signInResponse: SignInResponse) => {
              localStorage.setItem(LOCAL_STORAGE_TOKEN, signInResponse.token ?? "");
              this.profileService.setupUser(signInResponse.user);
          }),
      );
  }

  /**
   * Inicia sesión con el token del usuario.
   * @returns un `Observable` con un `SignInResponse` que tiene toda la información del usuario
   */
  tokenSignIn(): Observable<SignInResponse> {
      const savedToken: string | null = localStorage.getItem(LOCAL_STORAGE_TOKEN);
      const headers: HttpHeaders = new HttpHeaders()
          .append('Cache-Control', 'no-store')
          .append('Content-Type', 'application/json; charset=utf-8')
          .append('Type', 'web')
          .append('Authorization', `Bearer ${savedToken}`);
          
      return this.http.get<SignInResponse>(`${environment.apiUrl}auth/authToken`, {
          'headers': headers,
      }).pipe(
          tap((signInResponse: SignInResponse) => {
              //console.log(signInResponse);
              
              localStorage.setItem(LOCAL_STORAGE_TOKEN, signInResponse.token ?? "");
              this.profileService.setupUser({...signInResponse.user, token: signInResponse.token});
          }),
      );
  }

  /* backSession(identity: User){

    console.log('backSession', identity);
    
  return this.OAuthLogin(identity).pipe(tap((signInResponse: SignInResponse) => {
          
      }),
  );
    
  } */

  // Login
  login(userSignIn: UserSignIn) {
    return this.apollo
    .watchQuery(
      {
        query: login,
        variables: userSignIn,
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.login;
    }));
  }

  register(user: RegisterData) {
    return this.apollo
      .mutate({
        mutation: registerData,
        variables: {
          user
        }
      }).pipe(map((result: any) => {
        return result.data.register;
      }));
  }

  // OAuth Login
  OAuthLogin(token: string) {
    console.log(token);
    
    return this.apollo
    .watchQuery(
      {
        query: oauthLogin,
        variables: {token},
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
        return result.data.login;
    }));
  }


}
