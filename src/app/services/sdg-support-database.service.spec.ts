import { TestBed } from '@angular/core/testing';

import { SdgSupportDatabaseService } from './sdg-support-database.service';

describe('SdgSupportDatabaseService', () => {
  let service: SdgSupportDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdgSupportDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
