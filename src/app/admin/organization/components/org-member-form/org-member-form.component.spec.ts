import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMemberFormComponent } from './org-member-form.component';

describe('OrgMemberFormComponent', () => {
  let component: OrgMemberFormComponent;
  let fixture: ComponentFixture<OrgMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
