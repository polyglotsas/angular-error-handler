import { MatDialogConfig } from '@angular/material/dialog';

export interface MatErrorDialogConfig {
  title?: string;
  messageConstructor?: (error: any) => string;
  message?: string;
  closeButtonText?: string;
  matDialogConfig?: MatDialogConfig;
}
