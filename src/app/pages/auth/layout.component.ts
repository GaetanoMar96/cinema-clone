import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';


@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in and token still valid
        if (this.authenticationService.userValue) {
            const token: string | undefined = this.authenticationService.userValue.accessToken;
            if (token != undefined && !this.authenticationService.tokenExpired(token)) {
                this.router.navigate(['/home']);
            }
        }
        //redirect to log in after deleting user from storage
        this.authenticationService.logout()
    }
}