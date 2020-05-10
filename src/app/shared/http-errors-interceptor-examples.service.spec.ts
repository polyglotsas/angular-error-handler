import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpErrorsInterceptorExamplesService } from './http-errors-interceptor-examples.service';

describe('HttpErrorsInterceptorExamplesService', () => {
  let service: HttpErrorsInterceptorExamplesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpErrorsInterceptorExamplesService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpErrorsInterceptorExamplesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an http request to produce an error', done => {
    const data = { test: 'value' };
    service.produceError(400).subscribe(response => {
      expect(response).toEqual(data);
      done();
    });
    const req = httpTestingController.expectOne('400');
    expect(req.request.method).toEqual('GET');
    req.flush(data);
    httpTestingController.verify();
  });
});
