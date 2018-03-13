import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCmInfoComponent } from './update-cm-info.component';

describe('UpdateCmInfoComponent', () => {
  let component: UpdateCmInfoComponent;
  let fixture: ComponentFixture<UpdateCmInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCmInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
