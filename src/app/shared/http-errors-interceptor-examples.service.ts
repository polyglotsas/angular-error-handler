import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorsInterceptorExamplesService {
  constructor(private httpClient: HttpClient) {}

  produceError(statusCode: number): Observable<any> {
    return this.httpClient.get<any>(`${statusCode}`);
  }
}
