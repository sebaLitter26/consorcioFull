import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../../routes/user';


const EMPTY_USER: User = {

    id: '',
    name: '',
    modifierId: undefined,
  	rol: '',
    picture: '',
    phone: '',
    isActive: false,
    email: '',
    appartment: undefined,
    notes: '',
    createdAt: '',
    updatedAt: ''
    //permisos: [],
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    /** El usuario actual. */
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(EMPTY_USER);

    constructor() {}

    /**
     * Modifica el usuario actual.
     * @param user un objeto del tipo `CotoUser` con la información del usuario
     */
    set user(user: User) {
        this._user.next(user);
    }

    /**
     * Devuelve el usuario actual.
     * @returns un objeto del tipo `CotoUser` con la información del usuario
     */
    get user(): User {
        return this._user.value;
    }

    /**
     * Devuelve el token del usuario.
     * @returns el token
     */
    get token(): string {
        return this.user.id;
    }

    /**
     * Inicializa el usuario en memoria para ser usado a lo largo de toda la aplicación, mediante una instancia de este servicio.
     * @param user el usuario
     */
    setupUser(user: User, token:string): void {
        localStorage.setItem(environment.LOCAL_STORAGE_TOKEN, token);
        this.user = user;
    }

    /**
     * Mata el usuario actual, dejando todas sus propiedades en null (indica que no hay ningún usuario logueado).
     */
    killUser(): void {
        this._user.next(EMPTY_USER);
        localStorage.removeItem(environment.LOCAL_STORAGE_TOKEN);
        
    }

    /**
     * Verifica si el usuario tiene un permiso asignado.
     * @param permission el permiso
     */
    hasPermission(permission: string): boolean {
        return true;
        //return this.user.permisos && this.user.permisos.some(accessModule => permission == accessModule.modulo);
    }

    /**
     * Verifica si el usuario tiene acceso a una ruta.
     * @param route la ruta
     * @returns `true` en caso de que tenga acceso, `false` en caso contrario
     */
    hasRouteAccess(route: string): boolean {
        return true;
        /* const ruta = route.split("?")[0]; 
        for (let permission of this.user.permisos) {
            if(permission.pages.some(access => access.pageurl == ruta)){
                return true;
            }
                
            if (permission.pages == route.split("?")[0] ) {
                return true;
            }
        }
        return false; */
    }

    /**
     * Verifica si un usuario tiene acceso a un módulo.
     * @param module el módulo
     * @returns `true` en caso de que tenga acceso, `false` en caso contrario
     */
    hasModuleAccess(module: string): boolean {
        return true;
        //return this.user.permisos && this.user.permisos.some(accessModule => module == accessModule.modulo);
        /* for (let permission of this.user.permisos) {
            if (permission.split("_")[0] == module) {
                return true;
            }
        } */
    
        //return false;
    }

    /**
     * Obtiene un `Observable` que permite suscribirse a cambios en el usuario actual.
     * @returns un `Observable` con la estructura del usuario
     */
    userChangeEvent(): Observable<User> {
        return this._user.asObservable();
    }
}