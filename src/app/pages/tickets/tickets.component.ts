import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Ticket } from './../../helpers/index';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CinemaService, TicketService } from './../../services/index';

@Component({
  selector: 'tickets-card',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  
  tickets: Ticket[] = [];
  

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    //this.tickets = this.ticketService.getPurchasedTickets();
    this.tickets = [{
        movie: "Inception",
        startDate: "2023-08-27",
        startTime: "21:00",
        seat: "A1",
        cost: 10
    },
    {
        movie: "Inception",
        startDate: "2023-08-27",
        startTime: "21:00",
        seat: "A2",
        cost: 10
    }]
    
  }
}