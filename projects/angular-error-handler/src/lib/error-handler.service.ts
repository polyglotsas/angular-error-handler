import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
  ErrorHandlerModuleConfig,
  ErrorHandlerConfig,
  HttpErrorHandlerConfig,
  ErrorHandlerWithConfig,
  ErrorHandlingStrategy
} from './error-handler-module-config';
import { MatErrorDialogService } from './mat-error-dialog';
import { MatErrorSnackBarService } from './mat-error-snack-bar';
import { NavigateToErrorPageService } from './navigate-to-error-page/navigate-to-error-page.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private readonly ngZone: NgZone,
    private readonly errorHandlerModuleConfig: ErrorHandlerModuleConfig,
    private readonly matErrorDialogService: MatErrorDialogService,
    private readonly matErrorSnackBarService: MatErrorSnackBarService,
    private readonly navigateToErrorPageService: NavigateToErrorPageService
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
    const { errorsConfig, httpErrorsConfig } = this.errorHandlerModuleConfig;
    if (!httpErrorsConfig) {
      return errorsConfig;
    }
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
      case ErrorHandlingStrategy.MAT_ERROR_SNACK_BAR:
        return this.matErrorSnackBarService;
      case ErrorHandlingStrategy.NAVIGATE_TO_ERROR_PAGE:
        return this.navigateToErrorPageService;
    }
  }
}
