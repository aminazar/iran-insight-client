import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LceViewComponent } from './lce-view.component';

describe('LceViewComponent', () => {
  let component: LceViewComponent;
  let fixture: ComponentFixture<LceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
