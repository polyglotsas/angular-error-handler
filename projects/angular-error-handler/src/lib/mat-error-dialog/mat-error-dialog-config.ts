import { MatDialogConfig } from '@angular/material/dialog';

import { ErrorHandlingStrategy } from '../error-handler-module-config';

export interface MatErrorDialogStrategy {
  strategy: ErrorHandlingStrategy.MAT_ERROR_DIALOG;
  config?: MatErrorDialogConfig;
}

export interface MatErrorDialogDisplayData {
  title?: string;
  messageConstructor?: (error: any) => string;
  message?: string;
  closeButtonText?: string;
}

export interface MatErrorDialogConfig extends MatErrorDialogDisplayData {
  matDialogConfig?: MatDialogConfig;
}
