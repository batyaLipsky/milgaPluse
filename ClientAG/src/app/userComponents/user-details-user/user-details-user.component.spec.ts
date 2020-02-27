import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsUserComponent } from './user-details-user.component';

describe('UserDetailsUserComponent', () => {
  let component: UserDetailsUserComponent;
  let fixture: ComponentFixture<UserDetailsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
