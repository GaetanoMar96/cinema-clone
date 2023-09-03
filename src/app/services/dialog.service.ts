import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from './../pages/index';
import { ClientInfo } from './../models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {

  transaction: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(ticketInfo: ClientInfo): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
    });

    dialogRef.componentInstance.closeEmitter.subscribe((data: ClientInfo) => {
      if (data) {
        ticketInfo.cardNumber = data.cardNumber;
        ticketInfo.expirationDate = data.expirationDate;
        ticketInfo.cvc = data.cvc;

        console.log('transaction done succesfully');
        this.transaction.next(true);
        this.dialog.closeAll();
      }
      }
    );
  }
}
