import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendRegistrationModalComponent } from './extend-registration-modal.component';

describe('ExtendRegistrationModalComponent', () => {
  let component: ExtendRegistrationModalComponent;
  let fixture: ComponentFixture<ExtendRegistrationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendRegistrationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
