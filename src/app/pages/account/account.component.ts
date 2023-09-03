import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/index';

@Component({ templateUrl: 'account.component.html',
styleUrls: ['./account.component.scss'],})
export class AccountComponent implements OnInit {

    hide = true;
    oldPassword: string;
    newPassword: string;

    date: Date;
    isStudent: boolean;
    isButtonDisabled: boolean = true;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) 
    {}

    ngOnInit() {
        //go to log in page
        if (!this.authenticationService.userValue) {
            this.router.navigate(['/auth/login']);
        }
    }

    addUserInfo() {
        if (this.date && this.isStudent != undefined) {
            var timeDiff = Math.abs(Date.now() - this.date.getDate());
            const age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
            console.log(age) 
            //this.authenticationService.updateUser(age, this.isStudent);
        }
    }

    changePassword() {
        //retrieve password from the backend if == to old password than update value in db
        const userId = this.authenticationService.userValue?.userId
        const password = ''
        if (this.oldPassword == password) {
            //patch call to backend
        }
    }
}