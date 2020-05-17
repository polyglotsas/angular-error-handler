import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavigateToErrorPageService } from './navigate-to-error-page.service';
import { NavigateToErrorPageConfig } from './navigate-to-error-page-config';

describe('NavigateToErrorPageService', () => {
  const testError = new Error('Unexpected error');

  let service: NavigateToErrorPageService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpyObj }]
    });
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    service = TestBed.inject(NavigateToErrorPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if the configuration is not provided', () => {
    try {
      service.handleError(testError, undefined);
      fail();
    } catch (error) {
      expect(error.message).toBe('This strategy requires a configuration');
    }
  });

  describe('handles an error by navigating to an error page', () => {
    it('navigates to the URL given in the configuration', () => {
      const config: NavigateToErrorPageConfig = { errorPageUrl: '/error' };
      service.handleError(testError, config);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(config.errorPageUrl, { queryParams: {} });
    });

    it('sends the error in the params if specified in the configuration', () => {
      const config: NavigateToErrorPageConfig = { errorPageUrl: '/error', sendErrorInParams: true };
      service.handleError(testError, config);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(config.errorPageUrl, { queryParams: { error: testError } });
    });
  });
});
