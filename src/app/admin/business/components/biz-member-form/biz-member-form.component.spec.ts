import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizMemberFormComponent } from './biz-member-form.component';

describe('BizMemberFormComponent', () => {
  let component: BizMemberFormComponent;
  let fixture: ComponentFixture<BizMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
