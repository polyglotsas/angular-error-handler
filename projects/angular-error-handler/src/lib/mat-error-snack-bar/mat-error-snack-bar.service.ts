import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { ErrorHandlerWithConfig } from '../error-handler-module-config';

import { MatErrorSnackBarConfig, MatErrorSnackBarDisplayData } from './mat-error-snack-bar-config';

@Injectable({
  providedIn: 'root'
})
export class MatErrorSnackBarService implements ErrorHandlerWithConfig {
  readonly DEFAULT_MAT_ERROR_SNACK_BAR_DISPLAY_DATA: MatErrorSnackBarDisplayData = {
    message: 'An unexpected error occurred',
    dismissButtonText: 'Ok'
  };

  readonly DEFAULT_MAT_ERROR_SNACK_BAR_CONFIG: MatErrorSnackBarConfig = {
    ...this.DEFAULT_MAT_ERROR_SNACK_BAR_DISPLAY_DATA,
    matSnackBarConfig: {}
  };

  constructor(private readonly snackBar: MatSnackBar) {}

  handleError(error: any, config: MatErrorSnackBarConfig = this.DEFAULT_MAT_ERROR_SNACK_BAR_CONFIG) {
    const combinedConfig = { ...this.DEFAULT_MAT_ERROR_SNACK_BAR_CONFIG, ...config };
    const { dismissButtonText } = combinedConfig;
    const message = this.getMessage(error, combinedConfig);
    const snackBarConfig = this.getMatSnackBarConfig(error, combinedConfig);
    this.snackBar.open(message, dismissButtonText, snackBarConfig);
  }

  private getMessage(error: any, config: MatErrorSnackBarConfig): string {
    const { message, messageConstructor } = config;
    let result: string;
    try {
      result = !!messageConstructor ? messageConstructor(error) : message;
    } catch (error) {
      console.error('The message constructor got the following error:', error);
      result = message;
    }
    return result;
  }

  private getMatSnackBarConfig(error: any, config: MatErrorSnackBarConfig): MatSnackBarConfig {
    const { matSnackBarConfig, ...displayData } = config;
    const composedData = {
      ...displayData,
      ...matSnackBarConfig.data,
      error
    };
    return { ...matSnackBarConfig, data: composedData };
  }
}
