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
    isButtonDisabled: boolean = false;

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
        //patch call to backend  
        if (this.oldPassword !== '' && this.newPassword !== '' && this.oldPassword !== this.newPassword) {   
            console.log('yeah bitch')   
            this.authenticationService.changePwd(this.oldPassword, this.newPassword);  
        }
        this.isButtonDisabled = true;
        //this.router.navigate(['/cinema']);
    }
}