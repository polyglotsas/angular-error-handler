import { MatDialogConfig } from '@angular/material/dialog';

export interface MatErrorDialogDisplayData {
  title?: string;
  messageConstructor?: (error: any) => string;
  message?: string;
  closeButtonText?: string;
}

export interface MatErrorDialogConfig extends MatErrorDialogDisplayData {
  matDialogConfig?: MatDialogConfig;
}
