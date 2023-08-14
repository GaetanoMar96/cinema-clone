import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthenticationService } from './index';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in
        return this.authenticationService.userSubject.pipe(
            take(1),
            exhaustMap(user => {
              if (user === null || user === undefined) {
                return next.handle(request);
              }
              const modifiedRequest = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
              });
              return next.handle(modifiedRequest);
            })
          );
    }
}