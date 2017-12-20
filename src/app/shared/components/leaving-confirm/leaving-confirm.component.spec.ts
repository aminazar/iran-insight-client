import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingConfirmComponent } from './leaving-confirm.component';

describe('LeavingConfirmComponent', () => {
  let component: LeavingConfirmComponent;
  let fixture: ComponentFixture<LeavingConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavingConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavingConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
