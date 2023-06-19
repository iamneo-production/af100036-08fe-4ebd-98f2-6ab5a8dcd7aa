import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqformComponentComponent } from './faqform-component.component';

describe('FaqformComponentComponent', () => {
  let component: FaqformComponentComponent;
  let fixture: ComponentFixture<FaqformComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqformComponentComponent]
    });
    fixture = TestBed.createComponent(FaqformComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
