import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientInfo } from './../../../../models/index';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: [ './payment-dialog.component.scss' ]
})
export class PaymentDialogComponent {

  @Output() closeEmitter = new EventEmitter<ClientInfo>();

  form: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  data: ClientInfo;

  constructor(
    private formBuilder: FormBuilder
  )
  {}

  ngOnInit() {
    //initializing form
    this.form = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvc: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const data: ClientInfo = {
      cardNumber: this.f.cardNumber.value,
      expirationDate: this.f.expirationDate.value,
      cvc: this.f.cvc.value
    };

    this.closeEmitter.emit(data);
  }
}
