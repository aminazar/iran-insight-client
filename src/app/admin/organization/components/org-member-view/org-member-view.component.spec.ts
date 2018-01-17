import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMemberViewComponent } from './org-member-view.component';

describe('OrgMemberViewComponent', () => {
  let component: OrgMemberViewComponent;
  let fixture: ComponentFixture<OrgMemberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMemberViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
