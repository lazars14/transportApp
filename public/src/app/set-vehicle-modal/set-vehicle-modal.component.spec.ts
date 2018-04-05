import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetVehicleModalComponent } from './set-vehicle-modal.component';

describe('SetVehicleModalComponent', () => {
  let component: SetVehicleModalComponent;
  let fixture: ComponentFixture<SetVehicleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetVehicleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
