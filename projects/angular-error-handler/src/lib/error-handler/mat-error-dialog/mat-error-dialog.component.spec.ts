import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatErrorDialogComponent } from './mat-error-dialog.component';

describe('MatErrorDialogComponent', () => {
  let component: MatErrorDialogComponent;
  let fixture: ComponentFixture<MatErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatErrorDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
