import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface MatErrorSnackBarDisplayData {
  messageConstructor?: (error: any) => string;
  message?: string;
  dismissButtonText?: string;
}

export interface MatErrorSnackBarConfig extends MatErrorSnackBarDisplayData {
  matSnackBarConfig?: MatSnackBarConfig<any>;
}
