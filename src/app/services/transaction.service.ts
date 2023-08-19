import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient) {}

  putTransaction(userId: string, price: number): void {
    this.http.patch(
      `${environment.apiUrl}/${ApiPaths.Transactions}/transactions/${userId}/${price}`,
      "" // no body
    );
  }

}