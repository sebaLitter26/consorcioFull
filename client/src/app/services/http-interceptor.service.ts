import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Observable, iif, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ExpiredSessionDialogComponent } from '../modules/authentication/expired-session-dialog/expired-session-dialog.component';
import { ProfileService } from '../modules/main/services/profile.service';
import { RRHHResponse } from '../modules/model';
import { OverlayService } from '../modules/overlay/services/overlay.service';
import { SnackBarService } from './snackbar.service';

/** Código de estado de las peticiones */
export type Status = "ok" | "error";

export interface ErrorResponse {
    ok: boolean;
    error: string;
}

export interface oError {
    errorMessage: string;
    code: string;
}

/** Estas urls están excluidas del Interceptor */
export const EXCLUDED_API_URLS: string[] = [
    "serialapi",
    "ipadwebservices",
    "TrackingApi",
    //"localhost:3000"
    //"ApiAuditoriaOperativa",
];

/** Estas urls devuelven respuestas en formato string */
export const TEXT_API_URLS: string[] = [
    "version",
];

/** Estas urls no deben mostrar mensaje de error en caso de recibir un error. */
export const EXCLUDED_ERROR_API_URLS: string[] = [
    //"getReservaUsuario",
];

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private profileService: ProfileService,
        private snackBarService: SnackBarService,
        private overlayService: OverlayService,
        private matDialog: MatDialog,
    ) {}

    /**
     * Intercepta las peticiones HTTP y configura los headers de dichas peticiones a través de un `HttpHandler`
     * @param req la petición
     * @param next el handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq;
        let headers: HttpHeaders;

        console.log("INTERCEPTOR");
        
        if (!this._excludedUrl(req.url, EXCLUDED_API_URLS)) {
            //authReq;
            headers = req.headers
                .set('Cache-Control', 'no-store')
                .set('Content-Type', 'application/json; charset=utf-8')
                .set('Type', 'web')
                .set('Authorization', `Bearer ${this.profileService.token}`);
                

            if (this._textUrl(req.url)) {
                authReq = req.clone({
                    headers: headers,
                    responseType: "text",
                });
            } else {
                authReq = req.clone({
                    headers: headers,
                });
            }

            return next.handle(authReq).pipe(
                switchMap((event: HttpEvent<any>) => iif(() => event instanceof HttpResponse && event.status == 200 && !(<RRHHResponse>(event.body)).status.ok,
                    throwError(()=>new HttpErrorResponse({
                        error: (<RRHHResponse>((<HttpResponse<any>>event).body)),
                        status: 409,
                    })),
                    of(event)),
                ),
                catchError(error => {
                    this.handleError(error, req);
                    return of(error);
                }),
                map((event: HttpEvent<any>) => {
                    console.log(event);
                    
                    if (event instanceof HttpResponse && event.status == 200) {
                        if ((<RRHHResponse>(event.body)).status.ok) {
                            event = event.clone({
                                body: (<RRHHResponse>(event.body)).data
                            });
                        }
                    }

                    return event;
                }),
            );
        }
        
        return next.handle(req);
    }

    /**
     * Maneja los errores que se produzcan al hacer peticiones HTTP
     * @param ex el error HTTP
     */
    handleError(ex: HttpErrorResponse, req: HttpRequest<any>): void {
        this.overlayService.hideLoadingOverlay();

        if (ex.status == 401 || ex.status == 403) {
            this.matDialog.open(ExpiredSessionDialogComponent, {
                disableClose: true,
            });
        } else {
            const err = ex.error.status;
            let error: ErrorResponse = !err.ok ? err.error : '';
            if (!this._excludedErrorUrl(req.url)) {
                this.snackBarService.open(`ERROR: ${error}`, "Aceptar", 3000, "error-snackbar");
            }
        }
        // Lanzo el error para que lo maneje el que llamó al servicio
        throw ex;
    }

    /**
     * Verifica si la url de una petición está excluida para la modificación de sus headers
     * @param url la url
     */
    private _excludedUrl(url: string, excluded_urls: string[]): boolean {
        for (let exludedUrl of excluded_urls) {
            if (url.includes(exludedUrl)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Verifica si la url de una petición tiene respuesta del tipo texto
     * @param url la url
     */
    private _textUrl(url: string): boolean {
        for (let exludedUrl of TEXT_API_URLS) {
            if (url.includes(exludedUrl)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Verifica si la url debe mostrar mensaje de error o no.
     * @param url la url
     * @returns
     */
    private _excludedErrorUrl(url: string): boolean {
        for (let excludedUrl of EXCLUDED_ERROR_API_URLS) {
            if (url.includes(excludedUrl)) {
                return true;
            }
        }

        return false;
    }
}
