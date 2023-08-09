import { Component } from '@angular/core';

import { AuthenticationResponse } from './../../models/index';
import { AuthenticationService } from './../../services/index';
import {MatCardModule} from '@angular/material/card';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: AuthenticationResponse | null;

    constructor(private authenticationService: AuthenticationService) {
        this.user = this.authenticationService.userValue;
    }
}