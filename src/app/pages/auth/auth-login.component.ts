import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationRequest } from './../../models/index';
import { AuthenticationService } from './../../services/authentication.service';

@Component({ templateUrl: 'auth-login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
        //private alertService: AlertService
    ) { }

    ngOnInit() {
        //initializing form
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        const request: AuthenticationRequest = {
            email: this.f['email'].value,
            password: this.f['password'].value
        }

        this.authenticationService.login(request)
            .pipe(first())
            .subscribe({
                next: () => {
                    // valid registration navigate to home page
                    this.router.navigateByUrl('home');
                },
                error: error => {
                    //this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}