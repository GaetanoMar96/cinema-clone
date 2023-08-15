import { Component } from '@angular/core';
import { AuthenticationResponse } from './../../models/index';
import { AuthenticationService } from './../../services/index';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss'] })
export class HomeComponent {
    user: AuthenticationResponse | null;

    constructor(private authenticationService: AuthenticationService) {
        this.user = this.authenticationService.userValue;
    }
}