import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { EmployerDashboardComponent } from './employer-dashboard.component';

describe('EmployerDashboardComponent', () => {
  let component: EmployerDashboardComponent;
  let fixture: ComponentFixture<EmployerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerDashboardComponent]
    });
    fixture = TestBed.createComponent(EmployerDashboardComponent);
=======
import { EmployerPageComponent } from './employer-page.component';

describe('EmployerPageComponent', () => {
  let component: EmployerPageComponent;
  let fixture: ComponentFixture<EmployerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerPageComponent]
    });
    fixture = TestBed.createComponent(EmployerPageComponent);
>>>>>>> ef805b1a2678dd0db5de99f0246fe6b8834f9483
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

