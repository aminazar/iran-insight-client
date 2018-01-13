import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizMemberViewComponent } from './biz-member-view.component';

describe('BizMemberViewComponent', () => {
  let component: BizMemberViewComponent;
  let fixture: ComponentFixture<BizMemberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizMemberViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
