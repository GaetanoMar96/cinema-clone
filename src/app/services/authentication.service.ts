import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { RegisterRequest, AuthenticationRequest, AuthenticationResponse, PasswordRequest } from "./../models/index";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public userSubject: BehaviorSubject<AuthenticationResponse | null>;
    public user: Observable<AuthenticationResponse | null>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private afAuth: AngularFireAuth) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();

        // Subscribe to Firebase Auth state changes
        this.afAuth.authState.subscribe((user) => {
            if (user) {
            user.getIdToken().then((token) => {
                const userData: AuthenticationResponse = { userId: user.uid, accessToken: token };
                this.userSubject.next(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            });
            } else {
                this.userSubject.next(null);
                localStorage.removeItem('user');
            }
        });
    }

    public get userValue() {
        return this.userSubject.value;
    }

    /*Adding firebase authentication*/
    async register(request: RegisterRequest): Promise<void> {
        try {
            await this.afAuth.createUserWithEmailAndPassword(
                request.email, 
                request.password
            );            
        } catch (error) {
            throw error; // Handle registration failure
        }
    }

    async login(request: AuthenticationRequest): Promise<void> {
        try {
            await this.afAuth.signInWithEmailAndPassword(
                request.email, 
                request.password
            );
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Handle login failure
        }
    }

    async logout(): Promise<void> {
        try {
            await this.afAuth.signOut();
            this.router.navigate(['/login']);
        } catch (error) {
            throw error; 
        }
    }

    changePwd(oldPassword: string, newPassword: string): void {
        const request: PasswordRequest = {
            userId: this.userValue?.userId,
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        
        this.http.patch<any>(
            `${environment.apiUrl}/${ApiPaths.Auth}/changePassword`, request
        ).subscribe() //to invoke the actual call
    }

    //utility method to check if token expired
    tokenExpired(token: string): boolean {
        const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}