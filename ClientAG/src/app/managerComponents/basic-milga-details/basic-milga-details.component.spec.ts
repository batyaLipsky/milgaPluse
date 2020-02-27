import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicMilgaDetailsComponent } from './basic-milga-details.component';

describe('BasicMilgaDetailsComponent', () => {
  let component: BasicMilgaDetailsComponent;
  let fixture: ComponentFixture<BasicMilgaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicMilgaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMilgaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
