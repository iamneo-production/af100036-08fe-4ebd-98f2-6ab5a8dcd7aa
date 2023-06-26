import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddemployerformComponentComponent } from './addemployerform-component.component';

describe('AddemployerformComponentComponent', () => {
  let component: AddemployerformComponentComponent;
  let fixture: ComponentFixture<AddemployerformComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddemployerformComponentComponent]
    });
    fixture = TestBed.createComponent(AddemployerformComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
