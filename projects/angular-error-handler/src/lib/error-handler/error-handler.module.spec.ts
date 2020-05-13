import { ValueProvider } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorHandlerModule } from './error-handler.module';
import { ErrorHandlerConfig, ErrorHandlingStrategy, ErrorHandlerModuleConfig } from './error-handler-module-config';

describe('ErrorHandlerModule', () => {
  describe('has a forRoot method', () => {
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

    it('should return a module with providers', () => {
      const module = ErrorHandlerModule.forRoot(TEST_ERROR_HANDLER_MODULE_CONFIG);
      expect(module).toBeTruthy();
    });

    it('the returned module should provide the given configuration', () => {
      const module = ErrorHandlerModule.forRoot(TEST_ERROR_HANDLER_MODULE_CONFIG);
      const configProvider = module.providers.find(
        (provider: ValueProvider) =>
          provider.provide === ErrorHandlerModuleConfig && provider.useValue === TEST_ERROR_HANDLER_MODULE_CONFIG
      );
      expect(configProvider).toBeTruthy();
    });
  });
});
