import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareDashboardComponent } from './healthcare-dashboard.component';

describe('HealthcareDashboardComponent', () => {
  let component: HealthcareDashboardComponent;
  let fixture: ComponentFixture<HealthcareDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthcareDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthcareDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
