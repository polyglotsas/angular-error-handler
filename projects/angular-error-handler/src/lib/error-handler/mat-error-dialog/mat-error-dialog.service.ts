import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ErrorHandlerWithConfig } from '../error-handler-module-config';

import { MatErrorDialogComponent, ErrorDialogData } from './mat-error-dialog.component';
import { MatErrorDialogConfig, MatErrorDialogDisplayData } from './mat-error-dialog-config';

@Injectable({
  providedIn: 'root'
})
export class MatErrorDialogService implements ErrorHandlerWithConfig {
  readonly DEFAULT_MAT_DIALOG_CONFIG: MatDialogConfig = {
    maxHeight: '90%',
    maxWidth: '90%',
    role: 'alertdialog',
    ariaDescribedBy: 'mat-error-dialog-message',
    ariaLabelledBy: 'mat-error-dialog-title'
  };

  readonly DEFAULT_MAT_ERROR_DIALOG_DISPLAY_DATA: MatErrorDialogDisplayData = {
    title: 'Error',
    message: 'An unexpected error occurred',
    closeButtonText: 'Ok'
  };

  readonly DEFAULT_MAT_ERROR_DIALOG_CONFIG: MatErrorDialogConfig = {
    ...this.DEFAULT_MAT_ERROR_DIALOG_DISPLAY_DATA,
    matDialogConfig: this.DEFAULT_MAT_DIALOG_CONFIG
  };

  constructor(private readonly dialog: MatDialog) {}

  handleError(error: any, config: MatErrorDialogConfig = this.DEFAULT_MAT_ERROR_DIALOG_CONFIG): void {
    const dialogConfig = this.getMatDialogConfig(error, config);
    this.dialog.open<MatErrorDialogComponent, ErrorDialogData>(MatErrorDialogComponent, dialogConfig);
  }

  private getMatDialogConfig(error: any, config: MatErrorDialogConfig): MatDialogConfig<ErrorDialogData> {
    const combinedMatDialogConfig = this.getCombinedMatDialogConfig(config);
    const combinedDisplayData = this.getCombinedMatErrorDialogDisplayData(config);
    const composedData = {
      ...combinedDisplayData,
      ...combinedMatDialogConfig.data,
      error
    };
    return {
      ...combinedMatDialogConfig,
      data: composedData
    };
  }

  private getCombinedMatDialogConfig(config: MatErrorDialogConfig): MatDialogConfig {
    const { matDialogConfig } = config;
    return { ...matDialogConfig, ...this.DEFAULT_MAT_DIALOG_CONFIG };
  }

  private getCombinedMatErrorDialogDisplayData(config: MatErrorDialogConfig): MatErrorDialogDisplayData {
    const { matDialogConfig, ...displayData } = config;
    return { ...this.DEFAULT_MAT_ERROR_DIALOG_DISPLAY_DATA, ...displayData };
  }
}
