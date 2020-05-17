import { MatErrorDialogStrategy } from './mat-error-dialog';
import { MatErrorSnackBarStrategy } from './mat-error-snack-bar';
import { NavigateToErrorPageStrategy } from './navigate-to-error-page';

export type ErrorHandlerConfig = MatErrorDialogStrategy | MatErrorSnackBarStrategy | NavigateToErrorPageStrategy;

export interface ErrorHandlerWithConfig {
  handleError(error: any, config?: any): void;
}

export enum ErrorHandlingStrategy {
  MAT_ERROR_DIALOG = 'MatErrorDialogStrategy',
  MAT_ERROR_SNACK_BAR = 'MatErrorSnackBarStrategy',
  NAVIGATE_TO_ERROR_PAGE = 'NavigateToErrorPageStrategy'
}

export interface HttpErrorHandlerConfig {
  [status: number]: ErrorHandlerConfig;
  default: ErrorHandlerConfig;
}

export class ErrorHandlerModuleConfig {
  httpErrorsConfig?: ErrorHandlerConfig | HttpErrorHandlerConfig;
  errorsConfig: ErrorHandlerConfig;
}
