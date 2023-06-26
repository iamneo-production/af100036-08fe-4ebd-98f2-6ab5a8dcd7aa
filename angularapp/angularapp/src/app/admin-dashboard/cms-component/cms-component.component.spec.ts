import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsComponentComponent } from './cms-component.component';

describe('CmsComponentComponent', () => {
  let component: CmsComponentComponent;
  let fixture: ComponentFixture<CmsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmsComponentComponent]
    });
    fixture = TestBed.createComponent(CmsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
