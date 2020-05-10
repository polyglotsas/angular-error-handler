import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorHandlerModuleConfig, ErrorHandlingStrategy, ErrorHandlerConfig } from './error-handler.module';
import { ErrorHandlerService } from './error-handler.service';
import { MatErrorDialogService } from './mat-error-dialog';

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

  const TEST_ERROR_HANDLER_MODULE_CONFIG: ErrorHandlerModuleConfig = {
    httpErrorsConfig: {
      400: badRequestErrorHandlerConfig,
      default: { strategy: ErrorHandlingStrategy.MAT_ERROR_SNACKBAR }
    },
    errorsConfig: { strategy: ErrorHandlingStrategy.MAT_ERROR_DIALOG }
  };

  let service: ErrorHandlerService;
  let matErrorDialogServiceSpy: jasmine.SpyObj<MatErrorDialogService>;

  beforeEach(() => {
    const matErrorDialogServiceSpyObj = jasmine.createSpyObj('MatErrorDialogService', ['handleError']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ErrorHandlerModuleConfig, useValue: TEST_ERROR_HANDLER_MODULE_CONFIG },
        { provide: MatErrorDialogService, useValue: matErrorDialogServiceSpyObj }
      ]
    });
    service = TestBed.inject(ErrorHandlerService);
    matErrorDialogServiceSpy = TestBed.inject(MatErrorDialogService) as jasmine.SpyObj<MatErrorDialogService>;
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

      it('should use the default error handler specified for http errors if there is no specific one', () => {});

      it('should use the error handler if no configuration is provided for http errors', () => {});
    });

    it('should execute the appropriate error handling strategy to handle an error', () => {});
  });
});
