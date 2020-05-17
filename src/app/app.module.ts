import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ErrorHandlerConfig, ErrorHandlingStrategy, ErrorHandlerModule } from 'angular-error-handler';

import { AppRoutingModule } from './app-routing.module';
import { HttpExamplesInterceptor } from './shared/http-examples-interceptor';

import { AppComponent } from './app.component';
import { HttpErrorsInterceptorExamplesComponent } from './http-errors-interceptor-examples/http-errors-interceptor-examples.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ExamplesComponent } from './examples/examples.component';

const badRequestErrorHandlerConfig: ErrorHandlerConfig = {
  strategy: ErrorHandlingStrategy.MAT_ERROR_DIALOG,
  config: {
    messageConstructor: (error: HttpErrorResponse) => {
      const {
        error: { property, constraint }
      } = error;
      return `The ${property} has the following error: ${constraint}`;
    },
    title: 'Invalid data',
    closeButtonText: 'I understand'
  }
};

const unexpectedErrorHandlerConfig: ErrorHandlerConfig = {
  strategy: ErrorHandlingStrategy.MAT_ERROR_SNACK_BAR
};

const notFoundErrorHandlerConfig: ErrorHandlerConfig = {
  strategy: ErrorHandlingStrategy.NAVIGATE_TO_ERROR_PAGE,
  config: {
    errorPageUrl: 'error',
    sendErrorInParams: true
  }
};

@NgModule({
  declarations: [AppComponent, HttpErrorsInterceptorExamplesComponent, ErrorPageComponent, ExamplesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    ErrorHandlerModule.forRoot({
      httpErrorsConfig: {
        400: badRequestErrorHandlerConfig,
        404: notFoundErrorHandlerConfig,
        default: unexpectedErrorHandlerConfig
      },
      errorsConfig: unexpectedErrorHandlerConfig
    }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpExamplesInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
