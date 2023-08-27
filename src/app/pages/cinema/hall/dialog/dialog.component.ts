import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ]
})
export class DialogComponent {

  @Output() closeEmitter = new EventEmitter<boolean>();

  constructor() {}

  closeDialog(choice: boolean) {
    this.closeEmitter.emit(choice);
  }
}
