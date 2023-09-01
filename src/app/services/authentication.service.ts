import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
                this.userSubject.next(response);
                return response;
            }));
    }

    logout(): void {
        // remove user from session context
        this.http.post<any>(
            `${environment.apiUrl}/${ApiPaths.Auth}/logout`, "")

        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        // redirect to login page
        this.router.navigate(['/auth/login']);
    }

    /*updateUser(age: number, isStudent: boolean) {
        const userId = this.userValue?.userId;
        
        console.log("ready to call patch method")
        this.http.patch(
            `${environment.apiUrl}/${ApiPaths.Auth}/update/${userId}/${age}/${isStudent}`, 
            "" //no body
        ).subscribe(
            data => {
                console.log("correct call")
                if (this.userValue) {
                    this.userValue.age = age;
                    this.userValue.isStudent = isStudent;
                }
        });
    }*/

    //utility method to check if token expired
    tokenExpired(token: string): boolean {
        const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}