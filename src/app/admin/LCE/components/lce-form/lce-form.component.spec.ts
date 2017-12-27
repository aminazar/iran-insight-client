import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LceFormComponent } from './lce-form.component';

describe('LceFormComponent', () => {
  let component: LceFormComponent;
  let fixture: ComponentFixture<LceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
