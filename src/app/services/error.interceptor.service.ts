import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './index';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.authenticationService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.authenticationService.logout();
            } else if (err.status === 500 && this.authenticationService.userValue) {
                const token: string | undefined = this.authenticationService.userValue.accessToken;
                if (token != undefined && this.authenticationService.tokenExpired(token)) {
                    // auto logout if api returned 500 and token expired
                    console.error(err);
                    this.authenticationService.logout();
                }
            }
            
            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }
}