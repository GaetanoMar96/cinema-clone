import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { ClientInfo } from './../models/index';
import { Ticket } from '../helpers';

@Injectable({ providedIn: 'root' })
export class TicketService {

  ticketInfo = new BehaviorSubject({});
  tickets: Ticket[] = [];

  constructor(private http: HttpClient) {  
    
  }

  postMovieTicket(request: ClientInfo): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/${ApiPaths.Tickets}/ticket`,
      request
    );
  }

  deleteMovieTicket(request: ClientInfo): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/${ApiPaths.Tickets}/ticket/remove`,
      request
    );
  }

  getPurchasedTickets() {
    return this.tickets.slice();
  }
}
