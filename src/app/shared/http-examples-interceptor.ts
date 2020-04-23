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

  readonly clientError: HttpErrorResponse = new HttpErrorResponse({
    status: 400,
    error: {
      property: 'password',
      constraint: 'must be at least 8 characters long'
    }
  });

  constructor() {
    this.exampleErrorsMap = new Map();
    this.exampleErrorsMap.set('500', this.serverError);
    this.exampleErrorsMap.set('400', this.clientError);
  }

  intercept(req: HttpRequest<any>, _: HttpHandler): Observable<HttpEvent<any>> {
    const { url } = req;
    const error = this.exampleErrorsMap.get(url) || this.serverError;

    return throwError(error);
  }
}
