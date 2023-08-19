import { Component } from "@angular/core";
import { AuthenticationService } from './../../services/index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html' 
})
export class HeaderComponent {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
        
    }

    goToAccount() {
        this.router.navigate(['./account'])
    }

    logout() {
        this.authenticationService.logout();
    }
}