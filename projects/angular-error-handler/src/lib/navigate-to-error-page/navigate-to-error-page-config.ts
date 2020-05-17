import { UrlTree } from '@angular/router';

import { ErrorHandlingStrategy } from '../error-handler-module-config';

export interface NavigateToErrorPageStrategy {
  strategy: ErrorHandlingStrategy.NAVIGATE_TO_ERROR_PAGE;
  config: NavigateToErrorPageConfig;
}

export interface NavigateToErrorPageConfig {
  errorPageUrl: string | UrlTree;
  sendErrorInParams?: boolean;
}
