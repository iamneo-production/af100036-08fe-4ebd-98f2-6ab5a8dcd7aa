import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeranalyticsComponentComponent } from './employeranalytics-component.component';

describe('EmployeranalyticsComponentComponent', () => {
  let component: EmployeranalyticsComponentComponent;
  let fixture: ComponentFixture<EmployeranalyticsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeranalyticsComponentComponent]
    });
    fixture = TestBed.createComponent(EmployeranalyticsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
