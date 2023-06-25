import { TestBed } from '@angular/core/testing';

import { VisitRecordsService } from './visit-records.service';

describe('VisitRecordsService', () => {
  let service: VisitRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
