import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
  ErrorHandlerModuleConfig,
  HttpErrorHandlerConfig,
  ErrorHandlerConfig,
  ErrorHandlerWithConfig,
  ErrorHandlingStrategy
} from './error-handler.module';
import { MatErrorDialogService } from './mat-error-dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private readonly ngZone: NgZone,
    private readonly errorHandlerModuleConfig: ErrorHandlerModuleConfig,
    private readonly matErrorDialogService: MatErrorDialogService
  ) {}

  handleError(error: any): void {
    const errorHandlerConfig = this.getErrorHandlerConfig(error);
    const { config: strategyConfig } = errorHandlerConfig;
    const errorHandler = this.getErrorHandlerFromConfig(errorHandlerConfig);
    this.ngZone.run(() => {
      errorHandler.handleError(error, strategyConfig);
    });
  }

  private getErrorHandlerConfig(error: any): ErrorHandlerConfig {
    return error instanceof HttpErrorResponse
      ? this.getErrorHandlerConfigForHttpError(error)
      : this.errorHandlerModuleConfig.errorsConfig;
  }

  private getErrorHandlerConfigForHttpError(error: HttpErrorResponse): ErrorHandlerConfig {
    const httpErrorsConfig = this.errorHandlerModuleConfig.httpErrorsConfig;
    const { status } = error;
    const asHttpErrorHandlerConfig = httpErrorsConfig as HttpErrorHandlerConfig;
    const asErrorHandlerConfig = httpErrorsConfig as ErrorHandlerConfig;
    const config = asHttpErrorHandlerConfig[status] || asHttpErrorHandlerConfig.default || asErrorHandlerConfig;
    return config;
  }

  private getErrorHandlerFromConfig(errorHandlerConfig: ErrorHandlerConfig): ErrorHandlerWithConfig {
    switch (errorHandlerConfig.strategy) {
      case ErrorHandlingStrategy.MAT_ERROR_DIALOG:
        return this.matErrorDialogService;
    }
  }
}
