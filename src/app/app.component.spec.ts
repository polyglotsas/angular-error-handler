import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';

@Component({
  selector: 'ngeh-http-errors-interceptor-examples',
  template: '<div id="http-errors-interceptor-examples"></div>'
})
class HttpErrorsInterceptorExamplesStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [AppComponent, HttpErrorsInterceptorExamplesStubComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the http errors interceptor examples', () => {
    const nativeElement = fixture.nativeElement;
    const httpErrorsInterceptorElement = nativeElement.querySelector('#http-errors-interceptor-examples');
    expect(httpErrorsInterceptorElement).toBeTruthy();
  });
});
