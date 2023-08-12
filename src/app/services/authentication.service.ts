import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { RegisterRequest, AuthenticationRequest, AuthenticationResponse } from "./../models/index";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public userSubject: BehaviorSubject<AuthenticationResponse | null>;
    public user: Observable<AuthenticationResponse | null>;

    constructor(
        private router: Router,
        private http: HttpClient) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    register(request: RegisterRequest): Observable<AuthenticationResponse> {
        return this.http.post(`${environment.apiUrl}/${ApiPaths.Auth}/register`, request);
    }

    login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(
            `${environment.apiUrl}/${ApiPaths.Auth}/authenticate`, 
            request)
            .pipe(map(response => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(response));
                console.log('WITH TOKEEEN' + response);
                this.userSubject.next(response);
                return response;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        // redirect to login page
        this.router.navigate(['/auth/login']);
    }
}