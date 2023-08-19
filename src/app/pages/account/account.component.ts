import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TransactionService } from '../../services/index';

@Component({ templateUrl: 'account.component.html',
styleUrls: ['./account.component.scss'],})
export class AccountComponent implements OnInit {

    date: Date;
    isStudent: boolean;
    wallet: number = 0;
    isButtonDisabled: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private transactionService: TransactionService
    ) 
    {}

    ngOnInit() {
        //go to log in page
        //if (!this.authenticationService.userValue) {
        //    this.router.navigate(['/auth/login']);
        //}
        //disable first button if age and is student info are present
        if (this.authenticationService.userValue?.age != null ||
            this.authenticationService.userValue?.isStudent != null) 
            this.isButtonDisabled = true;
    }

    addUserInfo() {
        if (this.date && this.isStudent != undefined) {
            var timeDiff = Math.abs(Date.now() - this.date.getDate());
            const age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
            this.authenticationService.updateUser(age, this.isStudent);
        }
    }

    increaseWallet() {
        const userId = this.authenticationService.userValue?.userId
        if (userId && this.wallet > 0)
            this.transactionService.putTransaction(userId, this.wallet);
    }
}