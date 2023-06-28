import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobseekerformComponentComponent } from './addjobseekerform-component.component';

describe('AddjobseekerformComponentComponent', () => {
  let component: AddjobseekerformComponentComponent;
  let fixture: ComponentFixture<AddjobseekerformComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddjobseekerformComponentComponent]
    });
    fixture = TestBed.createComponent(AddjobseekerformComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
