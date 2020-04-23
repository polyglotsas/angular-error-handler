import { Component, OnInit } from '@angular/core';

import { HttpErrorsInterceptorExamplesService } from '../shared/http-errors-interceptor-examples.service';

@Component({
  selector: 'ngeh-http-errors-interceptor-examples',
  templateUrl: './http-errors-interceptor-examples.component.html',
  styleUrls: ['./http-errors-interceptor-examples.component.scss']
})
export class HttpErrorsInterceptorExamplesComponent implements OnInit {
  constructor(private readonly httpErrorsInterceptorExamplesService: HttpErrorsInterceptorExamplesService) {}

  ngOnInit(): void {}

  produceError(statusCode: number): void {
    this.httpErrorsInterceptorExamplesService.produceError(statusCode).subscribe(result => console.log(result));
  }
}
