import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { MatErrorSnackBarService } from './mat-error-snack-bar.service';
import { MatErrorSnackBarConfig } from './mat-error-snack-bar-config';

describe('MatErrorSnackBarService', () => {
  const testError = new Error('Test error');

  let service: MatErrorSnackBarService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const matSnackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: matSnackBarSpyObj }]
    });
    service = TestBed.inject(MatErrorSnackBarService);
    matSnackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handles an error', () => {
    let baseExpectedMatSnackBarConfig: MatSnackBarConfig;

    beforeEach(() => {
      baseExpectedMatSnackBarConfig = {
        data: { ...service.DEFAULT_MAT_ERROR_SNACK_BAR_DISPLAY_DATA, error: testError }
      };
    });

    it('should open the snack bar with a default configuration', () => {
      const { message, dismissButtonText } = service.DEFAULT_MAT_ERROR_SNACK_BAR_CONFIG;
      service.handleError(testError);
      expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, dismissButtonText, baseExpectedMatSnackBarConfig);
    });

    it('should open the snack bar with the configuration given', () => {
      const message = 'My error message';
      const dismissButtonText = 'My dismiss text';
      const matSnackBarConfig: MatSnackBarConfig = {
        ...baseExpectedMatSnackBarConfig,
        announcementMessage: 'Error'
      };
      const config: MatErrorSnackBarConfig = {
        message,
        dismissButtonText,
        matSnackBarConfig
      };
      service.handleError(testError, config);
      expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, dismissButtonText, matSnackBarConfig);
    });

    it('should construct the message in the snack bar if a constructor is given', () => {
      const expectedMessage = 'Server error';
      const httpError: HttpErrorResponse = new HttpErrorResponse({ error: { message: expectedMessage } });
      const messageConstructor = (error: any) => error.error.message;
      const { dismissButtonText } = service.DEFAULT_MAT_ERROR_SNACK_BAR_CONFIG;
      const config: MatErrorSnackBarConfig = { messageConstructor };
      service.handleError(httpError, config);
      expect(matSnackBarSpy.open).toHaveBeenCalledWith(expectedMessage, dismissButtonText, {
        data: {
          ...service.DEFAULT_MAT_ERROR_SNACK_BAR_DISPLAY_DATA,
          messageConstructor,
          error: httpError
        }
      });
    });

    it('should use the plain message given if the message constructor fails', () => {
      const expectedMessage = 'Fallback error message';
      const messageConstructor = (error: any) => error.error.message;
      const { dismissButtonText } = service.DEFAULT_MAT_ERROR_SNACK_BAR_CONFIG;
      const config: MatErrorSnackBarConfig = { messageConstructor, message: expectedMessage };
      service.handleError(testError, config);
      expect(matSnackBarSpy.open).toHaveBeenCalledWith(expectedMessage, dismissButtonText, {
        data: {
          ...service.DEFAULT_MAT_ERROR_SNACK_BAR_DISPLAY_DATA,
          message: expectedMessage,
          messageConstructor,
          error: testError
        }
      });
    });
  });
});
