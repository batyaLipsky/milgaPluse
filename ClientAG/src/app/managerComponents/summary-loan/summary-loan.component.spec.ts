import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryLoanComponent } from './summary-loan.component';

describe('SummaryLoanComponent', () => {
  let component: SummaryLoanComponent;
  let fixture: ComponentFixture<SummaryLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
