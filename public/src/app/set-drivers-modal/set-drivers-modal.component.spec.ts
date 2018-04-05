import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDriversModalComponent } from './set-drivers-modal.component';

describe('SetDriversModalComponent', () => {
  let component: SetDriversModalComponent;
  let fixture: ComponentFixture<SetDriversModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDriversModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDriversModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
