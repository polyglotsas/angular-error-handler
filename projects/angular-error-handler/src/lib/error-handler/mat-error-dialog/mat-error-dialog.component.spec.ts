import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatErrorDialogComponent, ErrorDialogData } from './mat-error-dialog.component';

describe('MatErrorDialogComponent', () => {
  const ERROR_DIALOG_DATA: ErrorDialogData = {
    title: 'Error',
    error: new HttpErrorResponse({ status: 400, error: { message: 'Invalid data' } }),
    message: 'An error has occurred',
    closeButtonText: 'Ok'
  };

  const ERROR_DIALOG_DATA_WITH_CONSTRUCTOR: ErrorDialogData = {
    ...ERROR_DIALOG_DATA,
    messageConstructor: (error: HttpErrorResponse) => error.error.message
  };

  const ERROR_DIALOG_DATA_WITH_FAULTY_CONSTRUCTOR: ErrorDialogData = {
    ...ERROR_DIALOG_DATA,
    messageConstructor: (error: HttpErrorResponse) => error.error.invalidProperty.message
  };

  let component: MatErrorDialogComponent;
  let fixture: ComponentFixture<MatErrorDialogComponent>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<MatErrorDialogComponent>>;

  function createComponent(providers: Provider[] = []) {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatButtonModule],
      declarations: [MatErrorDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) }, ...providers]
    }).compileComponents();
    matDialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<MatErrorDialogComponent>>;
    fixture = TestBed.createComponent(MatErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('works with a fixed error message', () => {
    beforeEach(() => {
      createComponent([{ provide: MAT_DIALOG_DATA, useValue: ERROR_DIALOG_DATA }]);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display the title correctly', () => {
      const titleElement = fixture.debugElement.query(By.css('#mat-error-dialog-title')).nativeElement;
      expect(titleElement.textContent).toEqual(ERROR_DIALOG_DATA.title);
    });

    it('should display the fixed message given', () => {
      const messageElement = fixture.debugElement.query(By.css('#mat-error-dialog-message')).nativeElement;
      expect(messageElement.textContent).toEqual(ERROR_DIALOG_DATA.message);
    });

    it('should display the close button correctly', () => {
      const buttonElement = fixture.debugElement.query(By.css('#mat-error-dialog-close-button')).nativeElement;
      expect(buttonElement.textContent).toEqual(ERROR_DIALOG_DATA.closeButtonText);
    });

    it('should close the dialog when the close button is clicked', () => {
      const buttonElement = fixture.debugElement.query(By.css('#mat-error-dialog-close-button')).nativeElement;
      buttonElement.click();
      expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1);
    });
  });

  it('should build the message if a message constructor function is provided', () => {
    createComponent([{ provide: MAT_DIALOG_DATA, useValue: ERROR_DIALOG_DATA_WITH_CONSTRUCTOR }]);
    const messageElement = fixture.debugElement.query(By.css('#mat-error-dialog-message')).nativeElement;
    expect(messageElement.textContent).toEqual('Invalid data');
  });

  it('should use the plain message if the constructor function fails', () => {
    createComponent([
      {
        provide: MAT_DIALOG_DATA,
        useValue: ERROR_DIALOG_DATA_WITH_FAULTY_CONSTRUCTOR
      }
    ]);
    const messageElement = fixture.debugElement.query(By.css('#mat-error-dialog-message')).nativeElement;
    expect(messageElement.textContent).toEqual(ERROR_DIALOG_DATA_WITH_FAULTY_CONSTRUCTOR.message);
  });
});
