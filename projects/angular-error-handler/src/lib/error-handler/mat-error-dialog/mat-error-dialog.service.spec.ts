import { TestBed } from '@angular/core/testing';

import { MatErrorDialogService } from './mat-error-dialog.service';

describe('MatErrorDialogService', () => {
  let service: MatErrorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatErrorDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
