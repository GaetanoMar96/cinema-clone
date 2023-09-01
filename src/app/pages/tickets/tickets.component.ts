import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Ticket } from './../../helpers/index';
import { Subject } from 'rxjs';
import { ClientInfo } from '../../models/index';
import { Router } from '@angular/router';
import { TicketService } from './../../services/index';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'tickets-card',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit, OnDestroy {
  
  ticketInfo: ClientInfo;
  tickets: Ticket[] = [];

  private destroy$ = new Subject<void>(); // Subject for unsubscribing

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketService.ticketInfo.asObservable()
    .pipe((takeUntil(this.destroy$)))
    .subscribe(data => {
      this.ticketInfo = data;
    })

    this.tickets = this.ticketService.getPurchasedTickets();
  }

  onDeleteTicket() {
    //client info
    this.ticketService.deleteMovieTicket(this.ticketInfo);
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}