import { Component, Inject } from '@angular/core';
import { DialogService } from './../../../../services/index';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-data',
    templateUrl: 'dialog-example.html',
  })
  export class DialogComponent {
    constructor(
      @Inject(MAT_DIALOG_DATA) private data: unknown,
      private dialogService: DialogService
    ) {
    }
  
    ngOnInit(): void {}

    closeDialog() {
      this.dialogService.close();
    }
  }