import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerprofileComponent } from './jobseekerprofile.component';

describe('JobseekerprofileComponent', () => {
  let component: JobseekerprofileComponent;
  let fixture: ComponentFixture<JobseekerprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerprofileComponent]
    });
    fixture = TestBed.createComponent(JobseekerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
