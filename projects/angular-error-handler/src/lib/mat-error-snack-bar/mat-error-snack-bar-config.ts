import { MatSnackBarConfig } from '@angular/material/snack-bar';

import { ErrorHandlingStrategy } from '../error-handler-module-config';

export interface MatErrorSnackBarStrategy {
  strategy: ErrorHandlingStrategy.MAT_ERROR_SNACK_BAR;
  config?: MatErrorSnackBarConfig;
}

export interface MatErrorSnackBarDisplayData {
  messageConstructor?: (error: any) => string;
  message?: string;
  dismissButtonText?: string;
}

export interface MatErrorSnackBarConfig extends MatErrorSnackBarDisplayData {
  matSnackBarConfig?: MatSnackBarConfig<any>;
}
