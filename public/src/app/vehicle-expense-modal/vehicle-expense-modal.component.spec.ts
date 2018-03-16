import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleExpenseModalComponent } from './vehicle-expense-modal.component';

describe('VehicleExpenseModalComponent', () => {
  let component: VehicleExpenseModalComponent;
  let fixture: ComponentFixture<VehicleExpenseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleExpenseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleExpenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
