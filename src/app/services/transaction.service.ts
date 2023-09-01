import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { AuthenticationService} from '../services/index';


@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) {}

  /*patchTransaction(userId: string, wallet: number): void {
    console.log("ready to call patch method")
    this.http.patch(
      `${environment.apiUrl}/${ApiPaths.Transactions}/transaction/${userId}/${wallet}`,
      "" // no body
    ).subscribe(
      data => {
          console.log("correct call")
          if (this.authenticationService.userValue) {
              this.authenticationService.userValue.wallet = wallet;
          }
  });;
  }*/

}