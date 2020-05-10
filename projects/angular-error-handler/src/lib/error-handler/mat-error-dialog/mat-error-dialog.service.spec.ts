import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MatErrorDialogService } from './mat-error-dialog.service';
import { MatErrorDialogComponent, ErrorDialogData } from './mat-error-dialog.component';

describe('MatErrorDialogService', () => {
  const testError = new Error('Test error');

  let service: MatErrorDialogService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const dialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: dialogSpyObj }]
    });
    service = TestBed.inject(MatErrorDialogService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handles an error', () => {
    it('should open the MatErrorDialogComponent with a default config', () => {
      const { matDialogConfig, ...expectedData } = service.DEFAULT_MAT_ERROR_DIALOG_CONFIG;
      const expectedMatDialogConfig: MatDialogConfig<ErrorDialogData> = {
        ...service.DEFAULT_MAT_DIALOG_CONFIG,
        data: {
          ...expectedData,
          error: testError,
          matDialogConfig
        }
      };
      service.handleError(testError);
      expect(dialogSpy.open).toHaveBeenCalledWith(MatErrorDialogComponent, expectedMatDialogConfig);
    });

    describe('combines the default config with the one provided in parameters', () => {
      it('should combine the MatDialogConfig given with the default one', () => {
        const { matDialogConfig, ...expectedData } = service.DEFAULT_MAT_ERROR_DIALOG_CONFIG;
        const customMatDialogConfig: MatDialogConfig = {
          height: '200px',
          width: '200px'
        };
        const combinedMatDialogConfig: MatDialogConfig = {
          ...matDialogConfig,
          ...customMatDialogConfig
        };
        const expectedMatDialogConfig: MatDialogConfig<ErrorDialogData> = {
          ...combinedMatDialogConfig,
          data: {
            ...expectedData,
            error: testError,
            matDialogConfig: combinedMatDialogConfig
          }
        };
        service.handleError(testError, { matDialogConfig: customMatDialogConfig });
        expect(dialogSpy.open).toHaveBeenCalledWith(MatErrorDialogComponent, expectedMatDialogConfig);
      });

      it('should combine the data given in the MatDialogConfig with the MatErrorDialogConfig data', () => {
        const { matDialogConfig, ...baseData } = service.DEFAULT_MAT_ERROR_DIALOG_CONFIG;
        const customData = { test: 'value' };
        const matDialogConfigSent = { ...matDialogConfig, data: customData };
        const expectedMatDialogConfig: MatDialogConfig<ErrorDialogData> = {
          ...matDialogConfig,
          data: {
            ...baseData,
            ...customData,
            error: testError,
            matDialogConfig: matDialogConfigSent
          }
        };
        service.handleError(testError, { matDialogConfig: matDialogConfigSent });
        expect(dialogSpy.open).toHaveBeenCalledWith(MatErrorDialogComponent, expectedMatDialogConfig);
      });

      it('should send the error in the data', () => {
        service.handleError(testError);
        const [componentSent, dialogConfigSent] = dialogSpy.open.calls.first().args;
        expect(componentSent).toBe(MatErrorDialogComponent);
        expect((dialogConfigSent as MatDialogConfig<ErrorDialogData>).data.error).toBe(testError);
      });
    });
  });
});
