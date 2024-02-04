import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthenticationRequest } from '../../../models/index';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({ templateUrl: 'auth-login.component.html',
styleUrls: ['./auth-login.component.scss'],})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  )
  {}

  ngOnInit() {
    //initializing form
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const request: AuthenticationRequest = {
      email: this.f.email.value,
      password: this.f.password.value,
    };

    try {
      await this.authenticationService.login(request).then(() => {
        this.router.navigate(['home']);
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
