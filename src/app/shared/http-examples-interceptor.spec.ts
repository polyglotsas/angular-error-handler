import { TestBed } from '@angular/core/testing';

import { HttpExamplesInterceptor } from './http-examples-interceptor';

describe('HttpExamplesInterceptorService', () => {
  let service: HttpExamplesInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpExamplesInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
