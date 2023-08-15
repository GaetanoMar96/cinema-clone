import { Component } from "@angular/core";
import { AuthenticationService } from './../../services/index';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html' 
})
export class HeaderComponent {

    constructor(private authenticationService: AuthenticationService) {
        
    }

    goToAccount() {
        //TODO
    }

    logout() {
        this.authenticationService.logout();
    }
}