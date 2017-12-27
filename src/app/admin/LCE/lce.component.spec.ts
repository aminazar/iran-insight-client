import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LCEComponent } from './lce.component';

describe('LCEComponent', () => {
  let component: LCEComponent;
  let fixture: ComponentFixture<LCEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LCEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LCEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
