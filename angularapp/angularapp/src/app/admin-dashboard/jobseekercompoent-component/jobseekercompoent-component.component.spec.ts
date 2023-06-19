import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekercompoentComponentComponent } from './jobseekercompoent-component.component';

describe('JobseekercompoentComponentComponent', () => {
  let component: JobseekercompoentComponentComponent;
  let fixture: ComponentFixture<JobseekercompoentComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekercompoentComponentComponent]
    });
    fixture = TestBed.createComponent(JobseekercompoentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
