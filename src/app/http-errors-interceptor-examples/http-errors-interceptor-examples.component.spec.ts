import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { HttpErrorsInterceptorExamplesService } from '../shared/http-errors-interceptor-examples.service';

import { HttpErrorsInterceptorExamplesComponent } from './http-errors-interceptor-examples.component';

describe('HttpErrorsInterceptorExamplesComponent', () => {
  let component: HttpErrorsInterceptorExamplesComponent;
  let fixture: ComponentFixture<HttpErrorsInterceptorExamplesComponent>;
  let httpErrorsInterceptorExamplesServiceSpy: jasmine.SpyObj<HttpErrorsInterceptorExamplesService>;

  beforeEach(async(() => {
    const spyObj = jasmine.createSpyObj('HttpErrorsInterceptorExamplesService', ['produceError']);
    spyObj.produceError.and.returnValue(of(undefined));
    TestBed.configureTestingModule({
      declarations: [HttpErrorsInterceptorExamplesComponent],
      providers: [{ provide: HttpErrorsInterceptorExamplesService, useValue: spyObj }]
    }).compileComponents();
    httpErrorsInterceptorExamplesServiceSpy = TestBed.inject(HttpErrorsInterceptorExamplesService) as jasmine.SpyObj<
      HttpErrorsInterceptorExamplesService
    >;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorsInterceptorExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('has buttons to test different http status codes', () => {
    it('should have a button to produce a 500 status code', () => {
      const buttonEl = fixture.debugElement.query(By.css('#produce-500-button')).nativeElement;
      buttonEl.click();
      expect(httpErrorsInterceptorExamplesServiceSpy.produceError).toHaveBeenCalledWith(500);
    });

    it('should have a button to produce a 400 status code', () => {
      const buttonEl = fixture.debugElement.query(By.css('#produce-400-button')).nativeElement;
      buttonEl.click();
      expect(httpErrorsInterceptorExamplesServiceSpy.produceError).toHaveBeenCalledWith(400);
    });

    it('should have a button to produce a 401 status code', () => {
      const buttonEl = fixture.debugElement.query(By.css('#produce-401-button')).nativeElement;
      buttonEl.click();
      expect(httpErrorsInterceptorExamplesServiceSpy.produceError).toHaveBeenCalledWith(401);
    });

    it('should have a button to produce a 404 status code', () => {
      const buttonEl = fixture.debugElement.query(By.css('#produce-404-button')).nativeElement;
      buttonEl.click();
      expect(httpErrorsInterceptorExamplesServiceSpy.produceError).toHaveBeenCalledWith(404);
    });
  });
});
