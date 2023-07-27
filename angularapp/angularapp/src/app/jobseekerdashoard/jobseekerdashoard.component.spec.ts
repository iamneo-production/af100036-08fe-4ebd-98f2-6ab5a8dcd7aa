import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerdashoardComponent } from './jobseekerdashoard.component';

describe('JobseekerdashoardComponent', () => {
  let component: JobseekerdashoardComponent;
  let fixture: ComponentFixture<JobseekerdashoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerdashoardComponent]
    });
    fixture = TestBed.createComponent(JobseekerdashoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
