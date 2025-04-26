import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovedPackagesComponent } from './approved-package.component';


describe('ApprovedPackageComponent', () => {
  let component: ApprovedPackagesComponent;
  let fixture: ComponentFixture<ApprovedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
