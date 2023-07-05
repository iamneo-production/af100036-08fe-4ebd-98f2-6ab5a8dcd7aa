import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemployerProfileComponent } from './editemployer-profile.component';

describe('EditemployerProfileComponent', () => {
  let component: EditemployerProfileComponent;
  let fixture: ComponentFixture<EditemployerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditemployerProfileComponent]
    });
    fixture = TestBed.createComponent(EditemployerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
