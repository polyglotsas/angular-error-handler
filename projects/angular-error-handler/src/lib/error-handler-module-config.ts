import { MatErrorDialogConfig } from './mat-error-dialog';

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
