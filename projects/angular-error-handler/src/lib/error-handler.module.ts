import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { ErrorHandlerModuleConfig } from './error-handler-module-config';
import { ErrorHandlerService } from './error-handler.service';
import { MatErrorDialogComponent } from './mat-error-dialog/mat-error-dialog.component';

@NgModule({
  imports: [MatDialogModule, MatSnackBarModule, MatButtonModule],
  declarations: [MatErrorDialogComponent],
  entryComponents: [MatErrorDialogComponent]
})
export class ErrorHandlerModule {
  static forRoot(config: ErrorHandlerModuleConfig): ModuleWithProviders {
    return {
      ngModule: ErrorHandlerModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: ErrorHandlerService
        },
        {
          provide: ErrorHandlerModuleConfig,
          useValue: config
        }
      ]
    };
  }
}
