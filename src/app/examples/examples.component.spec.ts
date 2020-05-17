import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ExamplesComponent } from './examples.component';

@Component({
  selector: 'ngeh-http-errors-interceptor-examples',
  template: '<div id="http-errors-interceptor-examples"></div>'
})
class HttpErrorsInterceptorExamplesStubComponent {}

describe('ExamplesComponent', () => {
  let component: ExamplesComponent;
  let fixture: ComponentFixture<ExamplesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [ExamplesComponent, HttpErrorsInterceptorExamplesStubComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the http errors interceptor examples', () => {
    const nativeElement = fixture.nativeElement;
    const httpErrorsInterceptorElement = nativeElement.querySelector('#http-errors-interceptor-examples');
    expect(httpErrorsInterceptorElement).toBeTruthy();
  });
});
