import { TestBed } from '@angular/core/testing';

import { SdgService } from './sdg.service';

describe('SdgService', () => {
  let service: SdgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
