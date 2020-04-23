import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorsInterceptorExamplesComponent } from './http-errors-interceptor-examples.component';

describe('HttpErrorsInterceptorExamplesComponent', () => {
  let component: HttpErrorsInterceptorExamplesComponent;
  let fixture: ComponentFixture<HttpErrorsInterceptorExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpErrorsInterceptorExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorsInterceptorExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
