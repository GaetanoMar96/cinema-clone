import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { take } from 'rxjs/operators';
import { RegisterRequest, Role } from '../../../models/index';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  templateUrl: 'auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  )
  {}

  ngOnInit() {
    //initializing form
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.validateEmail]],
      password: ['', [Validators.required, this.validatePassword]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const request: RegisterRequest = this.getRequest();
    try {
      await this.authenticationService.register(request);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  private getRequest(): RegisterRequest {
    return {
      firstname: this.f.firstName.value,
      lastname: this.f.lastName.value,
      email: this.f.email.value,
      password: this.f.password.value,
      role: Role.USER,
    };
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passwordRegExp = new RegExp('/^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/');
      if (!passwordRegExp.test(control.value)) {
        control.setErrors({ error: 'Invalid password' });
        return { error: 'Invalid password' };
      } else {
        control.setErrors(null);
        return null;
      }
    };
  }

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let emailRegExp = new RegExp('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i');
      if (!emailRegExp.test(control.value)) {
        control.setErrors({ error: 'Invalid email' });
        return { error: 'Invalid email' };
      } else {
        control.setErrors(null);
        return null;
      }
    };
  }
}
