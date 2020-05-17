import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorHandlerConfig, ErrorHandlingStrategy, ErrorHandlerModuleConfig } from './error-handler-module-config';
import { ErrorHandlerService } from './error-handler.service';
import { MatErrorDialogService } from './mat-error-dialog';
import { MatErrorSnackBarService } from './mat-error-snack-bar';
import { NavigateToErrorPageService } from './navigate-to-error-page';

describe('ErrorHandlerService', () => {
  const badRequestErrorHandlerConfig: ErrorHandlerConfig = {
    strategy: ErrorHandlingStrategy.MAT_ERROR_DIALOG,
    config: {
      messageConstructor: (error: HttpErrorResponse) => {
        const {
          error: { property, constraint }
        } = error;
        return `The ${property} has the following error: ${constraint}`;
      },
      title: 'Invalid data',
      closeButtonText: 'I understand'
    }
  };

  const navigateToErrorPageConfig: ErrorHandlerConfig = {
    strategy: ErrorHandlingStrategy.NAVIGATE_TO_ERROR_PAGE,
    config: { errorPageUrl: 'error' }
  };

  let service: ErrorHandlerService;
  let matErrorDialogServiceSpy: jasmine.SpyObj<MatErrorDialogService>;
  let matErrorSnackBarServiceSpy: jasmine.SpyObj<MatErrorSnackBarService>;
  let navigateToErrorPageServiceSpy: jasmine.SpyObj<NavigateToErrorPageService>;

  function configureTestingModule(providers: Provider[] = []) {
    const matErrorDialogServiceSpyObj = jasmine.createSpyObj('MatErrorDialogService', ['handleError']);
    const matErrorSnackBarServiceSpyObj = jasmine.createSpyObj('MatErrorSnackBarService', ['handleError']);
    const navigateToErrorPageServiceSpyObj = jasmine.createSpyObj('NavigateToErrorPageService', ['handleError']);
    TestBed.configureTestingModule({
      providers: [
        { provide: MatErrorDialogService, useValue: matErrorDialogServiceSpyObj },
        { provide: MatErrorSnackBarService, useValue: matErrorSnackBarServiceSpyObj },
        { provide: NavigateToErrorPageService, useValue: navigateToErrorPageServiceSpyObj },
        ...providers
      ]
    });
    service = TestBed.inject(ErrorHandlerService);
    matErrorDialogServiceSpy = TestBed.inject(MatErrorDialogService) as jasmine.SpyObj<MatErrorDialogService>;
    matErrorSnackBarServiceSpy = TestBed.inject(MatErrorSnackBarService) as jasmine.SpyObj<MatErrorSnackBarService>;
    navigateToErrorPageServiceSpy = TestBed.inject(NavigateToErrorPageService) as jasmine.SpyObj<
      NavigateToErrorPageService
    >;
  }

  describe('works well with an HttpErrorsConfig', () => {
    const TEST_MODULE_CONFIG: ErrorHandlerModuleConfig = {
      httpErrorsConfig: {
        400: badRequestErrorHandlerConfig,
        default: { strategy: ErrorHandlingStrategy.MAT_ERROR_SNACK_BAR }
      },
      errorsConfig: navigateToErrorPageConfig
    };

    beforeEach(() => {
      configureTestingModule([{ provide: ErrorHandlerModuleConfig, useValue: TEST_MODULE_CONFIG }]);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('handles errors', () => {
      describe('handles http errors', () => {
        it('should use the error handler specified to the status code if one is given', () => {
          const error: HttpErrorResponse = new HttpErrorResponse({
            status: 400,
            error: {
              property: 'password',
              constraint: 'must be at least 8 characters long'
            }
          });
          service.handleError(error);
          expect(matErrorDialogServiceSpy.handleError).toHaveBeenCalledWith(error, badRequestErrorHandlerConfig.config);
        });

        it('should use the default error handler specified for http errors if there is no specific one', () => {
          const error: HttpErrorResponse = new HttpErrorResponse({
            status: 404,
            error: {
              message: 'The given product was not found'
            }
          });
          service.handleError(error);
          expect(matErrorSnackBarServiceSpy.handleError).toHaveBeenCalledWith(error, undefined);
        });
      });

      it('should handle a normal error', () => {
        const error = new Error('Unexpected error');
        service.handleError(error);
        expect(navigateToErrorPageServiceSpy.handleError).toHaveBeenCalledWith(error, navigateToErrorPageConfig.config);
      });
    });
  });

  describe('works with a plain errors configuration for HttpErrorsConfig', () => {
    const TEST_MODULE_CONFIG: ErrorHandlerModuleConfig = {
      httpErrorsConfig: { strategy: ErrorHandlingStrategy.MAT_ERROR_SNACK_BAR },
      errorsConfig: navigateToErrorPageConfig
    };

    beforeEach(() => {
      configureTestingModule([{ provide: ErrorHandlerModuleConfig, useValue: TEST_MODULE_CONFIG }]);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('handles errors', () => {
      it('should use the error handler for an http error', () => {
        const error: HttpErrorResponse = new HttpErrorResponse({
          status: 404,
          error: {
            message: 'The given product was not found'
          }
        });
        service.handleError(error);
        expect(matErrorSnackBarServiceSpy.handleError).toHaveBeenCalledWith(error, undefined);
      });

      it('should handle a normal error', () => {
        const error = new Error('Unexpected error');
        service.handleError(error);
        expect(navigateToErrorPageServiceSpy.handleError).toHaveBeenCalledWith(error, navigateToErrorPageConfig.config);
      });
    });
  });

  describe('works well without HttpErrorsConfig', () => {
    const TEST_MODULE_CONFIG_WITHOUT_HTTP_CONFIG: ErrorHandlerModuleConfig = {
      errorsConfig: navigateToErrorPageConfig
    };

    beforeEach(() => {
      configureTestingModule([{ provide: ErrorHandlerModuleConfig, useValue: TEST_MODULE_CONFIG_WITHOUT_HTTP_CONFIG }]);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('handles errors', () => {
      it('should use the error handler for an http error', () => {
        const error: HttpErrorResponse = new HttpErrorResponse({
          status: 404,
          error: {
            message: 'The given product was not found'
          }
        });
        service.handleError(error);
        expect(navigateToErrorPageServiceSpy.handleError).toHaveBeenCalledWith(error, navigateToErrorPageConfig.config);
      });

      it('should handle a normal error', () => {
        const error = new Error('Unexpected error');
        service.handleError(error);
        expect(navigateToErrorPageServiceSpy.handleError).toHaveBeenCalledWith(error, navigateToErrorPageConfig.config);
      });
    });
  });
});
