import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekereditprofileComponent } from './jobseekereditprofile.component';

describe('JobseekereditprofileComponent', () => {
  let component: JobseekereditprofileComponent;
  let fixture: ComponentFixture<JobseekereditprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekereditprofileComponent]
    });
    fixture = TestBed.createComponent(JobseekereditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
