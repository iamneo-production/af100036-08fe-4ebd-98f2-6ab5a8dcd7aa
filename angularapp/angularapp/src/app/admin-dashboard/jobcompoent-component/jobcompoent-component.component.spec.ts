import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcompoentComponentComponent } from './jobcompoent-component.component';

describe('JobcompoentComponentComponent', () => {
  let component: JobcompoentComponentComponent;
  let fixture: ComponentFixture<JobcompoentComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobcompoentComponentComponent]
    });
    fixture = TestBed.createComponent(JobcompoentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
