import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchComponent } from './job-search.component';

describe('JobSearchComponent', () => {
  let component: JobSearchComponent;
  let fixture: ComponentFixture<JobSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSearchComponent]
    });
    fixture = TestBed.createComponent(JobSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
