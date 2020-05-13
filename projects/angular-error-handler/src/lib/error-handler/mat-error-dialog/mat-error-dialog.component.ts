import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatErrorDialogConfig } from './mat-error-dialog-config';

export interface ErrorDialogData extends MatErrorDialogConfig {
  error: any;
}

@Component({
  selector: 'ngeh-mat-error-dialog',
  templateUrl: './mat-error-dialog.component.html',
  styleUrls: ['./mat-error-dialog.component.scss']
})
export class MatErrorDialogComponent {
  title: string;

  message: string;

  closeButtonText: string;

  constructor(
    private readonly dialogRef: MatDialogRef<MatErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: ErrorDialogData
  ) {
    ({ title: this.title, closeButtonText: this.closeButtonText } = this.data);
    this.initializeMessage();
  }

  private initializeMessage() {
    const { message, messageConstructor, error } = this.data;
    try {
      this.message = !!messageConstructor ? messageConstructor(error) : message;
    } catch (error) {
      console.error('The message constructor got the following error:', error);
      this.message = message;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
