import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ErrorHandlerWithConfig } from '../error-handler-module-config';

import { NavigateToErrorPageConfig } from './navigate-to-error-page-config';

@Injectable({
  providedIn: 'root'
})
export class NavigateToErrorPageService implements ErrorHandlerWithConfig {
  constructor(private readonly router: Router) {}

  handleError(error: any, config: NavigateToErrorPageConfig): void {
    if (!config) {
      throw new Error('This strategy requires a configuration');
    }
    const { errorPageUrl } = config;
    const navigationExtras = this.getNavigationExtras(error, config);
    this.router.navigateByUrl(errorPageUrl, navigationExtras);
  }

  private getNavigationExtras(error: any, config: NavigateToErrorPageConfig): NavigationExtras {
    const { sendErrorInParams } = config;
    const extras: NavigationExtras = { queryParams: {} };

    if (!!sendErrorInParams) {
      extras.queryParams.error = error;
    }

    return extras;
  }
}
