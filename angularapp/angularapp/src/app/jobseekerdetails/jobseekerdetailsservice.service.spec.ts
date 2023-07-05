import { TestBed } from '@angular/core/testing';

import { JobseekerdetailsserviceService } from './jobseekerdetailsservice.service';

describe('JobseekerdetailsserviceService', () => {
  let service: JobseekerdetailsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobseekerdetailsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
