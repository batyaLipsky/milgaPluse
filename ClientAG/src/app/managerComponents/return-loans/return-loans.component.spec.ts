import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnLoansComponent } from './return-loans.component';

describe('ReturnLoansComponent', () => {
  let component: ReturnLoansComponent;
  let fixture: ComponentFixture<ReturnLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
