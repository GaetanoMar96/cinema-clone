import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient) {}

  putTransaction(userId: string, price: number): void {
    this.http.put(
      `${environment.apiUrl}/${ApiPaths.Transactions}/transactions/userId/price`,
      { params: { userId: userId, price: price} }
    );
  }

  
}