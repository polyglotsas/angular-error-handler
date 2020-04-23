import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ErrorHandlerService } from './error-handler.service';
import { MatErrorDialogComponent } from './mat-error-dialog/mat-error-dialog.component';
import { MatErrorDialogConfig } from './mat-error-dialog/mat-error-dialog-config';
import { MatButtonModule } from '@angular/material/button';

export type ErrorHandlerStrategyConfig = MatErrorDialogConfig;

export interface ErrorHandlerWithConfig {
  handleError(error: any, config?: ErrorHandlerStrategyConfig): void;
}

export enum ErrorHandlingStrategy {
  MAT_ERROR_DIALOG = 'MatErrorDialogStrategy',
  MAT_ERROR_SNACKBAR = 'MatErrorSnackbarStrategy'
}

export interface HttpErrorHandlerConfig {
  [status: number]: ErrorHandlerConfig;
  default: ErrorHandlerConfig;
}

export interface ErrorHandlerConfig {
  strategy: ErrorHandlingStrategy;
  config?: MatErrorDialogConfig;
}

export class ErrorHandlerModuleConfig {
  httpErrorsConfig: ErrorHandlerConfig | HttpErrorHandlerConfig;
  errorsConfig: ErrorHandlerConfig;
}

@NgModule({
  imports: [MatDialogModule, MatButtonModule],
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
