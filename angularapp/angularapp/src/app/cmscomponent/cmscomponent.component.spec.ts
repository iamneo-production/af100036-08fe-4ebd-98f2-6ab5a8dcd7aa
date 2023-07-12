import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmscomponentComponent } from './cmscomponent.component';

describe('CmscomponentComponent', () => {
  let component: CmscomponentComponent;
  let fixture: ComponentFixture<CmscomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmscomponentComponent]
    });
    fixture = TestBed.createComponent(CmscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
