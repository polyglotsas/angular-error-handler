import { TestBed } from '@angular/core/testing';

import { HttpErrorsInterceptorExamplesService } from './http-errors-interceptor-examples.service';

describe('HttpErrorsInterceptorExamplesService', () => {
  let service: HttpErrorsInterceptorExamplesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorsInterceptorExamplesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
