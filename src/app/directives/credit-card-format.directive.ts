import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCreditCardFormat]'
})
export class CreditCardFormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = event.target.value;
    value = value.replace(/\s+/g, '');

    if (value.length > 0) {
      value = value.match(/.{1,4}/g).join(' '); // Add a space every four characters
    }

    event.target.value = value;
  }
}
