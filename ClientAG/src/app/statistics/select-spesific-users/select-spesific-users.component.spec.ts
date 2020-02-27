import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSpesificUsersComponent } from './select-spesific-users.component';

describe('SelectSpesificUsersComponent', () => {
  let component: SelectSpesificUsersComponent;
  let fixture: ComponentFixture<SelectSpesificUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSpesificUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpesificUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
