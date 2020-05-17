import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpExamplesInterceptor implements HttpInterceptor {
  private readonly exampleErrorsMap: Map<string, HttpErrorResponse>;

  readonly serverError: HttpErrorResponse = new HttpErrorResponse({
    status: 500,
    error: {
      message: 'Unable to connect to the database'
    }
  });

  readonly httpErrors: HttpErrorResponse[] = [
    this.serverError,
    new HttpErrorResponse({
      status: 400,
      error: {
        property: 'password',
        constraint: 'must be at least 8 characters long'
      }
    }),
    new HttpErrorResponse({
      status: 401,
      error: {
        message: 'You need to sign in first'
      }
    }),
    new HttpErrorResponse({
      status: 404,
      error: {
        message: 'The product was not found'
      }
    })
  ];

  constructor() {
    this.exampleErrorsMap = new Map();
    this.httpErrors.forEach((httpError: HttpErrorResponse) =>
      this.exampleErrorsMap.set(`${httpError.status}`, httpError)
    );
  }

  intercept(req: HttpRequest<any>, _: HttpHandler): Observable<HttpEvent<any>> {
    const { url } = req;
    const error = this.exampleErrorsMap.get(url) || this.serverError;

    return throwError(error);
  }
}
