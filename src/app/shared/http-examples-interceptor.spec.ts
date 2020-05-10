import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpExamplesInterceptor } from './http-examples-interceptor';

describe('HttpExamplesInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpExamplesInterceptor,
          multi: true
        }
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('intercepts requests and throw errors', () => {
    it('should throw the error specified to the URL', done => {
      httpClient.get<any>('400').subscribe(
        () => fail(),
        (error: HttpErrorResponse) => {
          const { error: errorBody, status } = error;
          expect(status).toBe(400);
          expect(errorBody).toEqual({
            property: 'password',
            constraint: 'must be at least 8 characters long'
          });
          done();
        }
      );
    });

    it('should throw a default error if the URL does not match', done => {
      httpClient.get<any>('spanish-inquisition').subscribe(
        () => fail(),
        (error: HttpErrorResponse) => {
          const { error: errorBody, status } = error;
          expect(status).toBe(500);
          expect(errorBody).toEqual({
            message: 'Unable to connect to the database'
          });
          done();
        }
      );
    });
  });
});
