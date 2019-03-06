import { TestBed, inject } from '@angular/core/testing';

import { CommonAccretioService } from './common-accretio.service';

describe('CommonAccretioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonAccretioService]
    });
  });

  it('should be created', inject([CommonAccretioService], (service: CommonAccretioService) => {
    expect(service).toBeTruthy();
  }));
});
