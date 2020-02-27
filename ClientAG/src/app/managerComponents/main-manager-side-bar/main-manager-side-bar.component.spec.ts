import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainManagerSideBarComponent } from './main-manager-side-bar.component';

describe('MainManagerSideBarComponent', () => {
  let component: MainManagerSideBarComponent;
  let fixture: ComponentFixture<MainManagerSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainManagerSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainManagerSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
