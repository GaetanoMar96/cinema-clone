import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthenticationService, TicketService } from './../../services/index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html' 
})
export class HeaderComponent implements OnInit, OnChanges {

    hidden: boolean = false;
    value: string = "1";

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private ticketService: TicketService) {}
    
    ngOnInit(): void {
        this.hidden = this.ticketService.tickets.length == 0;
        this.value = this.ticketService.tickets.length.toString();
    }

    ngOnChanges(): void {
        this.hidden = this.ticketService.tickets.length == 0;
        this.value = this.ticketService.tickets.length.toString();
    }

    goToAccount() {
        this.router.navigate(['./account'])
    }

    goToTickets() {
        this.router.navigate(['./tickets'])
    }

    logout() {
        this.authenticationService.logout();
    }
}