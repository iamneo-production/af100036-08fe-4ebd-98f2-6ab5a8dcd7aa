import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobformComponentComponent } from './addjobform-component.component';

describe('AddjobformComponentComponent', () => {
  let component: AddjobformComponentComponent;
  let fixture: ComponentFixture<AddjobformComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddjobformComponentComponent]
    });
    fixture = TestBed.createComponent(AddjobformComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
