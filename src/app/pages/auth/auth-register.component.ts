import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RegisterRequest } from './../../models/index';
import { AuthenticationService } from './../../services/authentication.service';

@Component({ 
    templateUrl: 'auth-register.component.html',
    styleUrls: ['./auth-register.component.scss']
})
export class RegistrationComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        //private alertService: AlertService
    ) { }

    ngOnInit() {
        //initializing form
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required]
        });
        // add validation for email and password
        this.f['email'].addValidators(this.validateEmail());
        this.f['password'].addValidators(this.validatePassword());
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        const request: RegisterRequest = {
            firstname: this.f['firstName'].value,
            lastname: this.f['lastName'].value,
            email: this.f['email'].value,
            password: this.f['password'].value
        }

        this.authenticationService.register(request)
            .pipe(first())
            .subscribe({
                next: () => {
                    // valid registration navigate to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    //this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    validatePassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let passwordRegExp = new RegExp('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/');
            if (!passwordRegExp.test(control.value)) {
                control.setErrors({error: 'Invalid password'});
                return {error: 'Invalid password'}
            } else {
                control.setErrors(null);
                return null;
            }
      };
    }

    validateEmail(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let emailRegExp = new RegExp('/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/');
            if (!emailRegExp.test(control.value)) {
                control.setErrors({error: 'Invalid email'});
                return {error: 'Invalid email'}
            } else {
                control.setErrors(null);
                return null;
            }
      };
    }
}
