import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../pages/index';

@Injectable({providedIn: 'root'})
export class DialogService {
  
  constructor(public dialog: MatDialog) {}

  open() {
    this.dialog.open(DialogComponent, {});
  }

  close() {
    this.dialog.closeAll()
  }

}