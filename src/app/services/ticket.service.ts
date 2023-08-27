import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { ClientInfo } from './../models/index';
import { Ticket } from '../helpers';

@Injectable({ providedIn: 'root' })
export class TicketService {

  tickets: Ticket[] = [];

  constructor(private router: Router, private http: HttpClient) {}

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
