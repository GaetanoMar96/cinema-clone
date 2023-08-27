import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../pages/index';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog,
    private router: Router) {}

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });

    dialogRef.componentInstance.closeEmitter.subscribe((choice) => {
      if (choice) {
        this.dialog.closeAll();
        this.router.navigate(['/home']);
      }
      }
    );
  }
}
