import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployercomponentComponent } from './employercomponent.component';

describe('EmployercomponentComponent', () => {
  let component: EmployercomponentComponent;
  let fixture: ComponentFixture<EmployercomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployercomponentComponent]
    });
    fixture = TestBed.createComponent(EmployercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
