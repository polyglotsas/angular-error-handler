import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ErrorHandlerWithConfig } from '../error-handler.module';

import { MatErrorDialogComponent, ErrorDialogData } from './mat-error-dialog.component';
import { MatErrorDialogConfig } from './mat-error-dialog-config';

@Injectable({
  providedIn: 'root'
})
export class MatErrorDialogService implements ErrorHandlerWithConfig {
  private readonly DEFAULT_MAT_DIALOG_CONFIG: MatDialogConfig = {
    maxHeight: '90%',
    maxWidth: '90%',
    role: 'alertdialog',
    ariaDescribedBy: 'mat-error-dialog-message',
    ariaLabelledBy: 'mat-error-dialog-title'
  };

  private readonly DEFAULT_MAT_ERROR_DIALOG_CONFIG: MatErrorDialogConfig = {
    title: 'Error',
    message: 'An unexpected error occurred',
    closeButtonText: 'Ok',
    matDialogConfig: this.DEFAULT_MAT_DIALOG_CONFIG
  };

  constructor(private readonly dialog: MatDialog) {}

  handleError(error: any, config: MatErrorDialogConfig = this.DEFAULT_MAT_ERROR_DIALOG_CONFIG): void {
    const { matDialogConfig = {}, ...configData } = config;
    const composedData = { ...matDialogConfig.data, ...configData, matDialogConfig, error };
    const dialogConfig: MatDialogConfig = {
      ...matDialogConfig,
      data: composedData
    };
    this.dialog.open<MatErrorDialogComponent, ErrorDialogData>(MatErrorDialogComponent, dialogConfig);
  }
}
