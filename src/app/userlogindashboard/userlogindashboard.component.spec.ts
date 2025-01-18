import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlogindashboardComponent } from './userlogindashboard.component';

describe('UserlogindashboardComponent', () => {
  let component: UserlogindashboardComponent;
  let fixture: ComponentFixture<UserlogindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserlogindashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlogindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
