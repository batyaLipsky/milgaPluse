import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnterManagerComponent } from './modal-enter-manager.component';

describe('ModalEnterManagerComponent', () => {
  let component: ModalEnterManagerComponent;
  let fixture: ComponentFixture<ModalEnterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEnterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEnterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
