import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { ClientInfo } from './../models/index';

@Injectable({ providedIn: 'root' })
export class TicketService {
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
}
