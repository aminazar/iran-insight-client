import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessMembersComponent } from './business-members.component';

describe('BusinessMembersComponent', () => {
  let component: BusinessMembersComponent;
  let fixture: ComponentFixture<BusinessMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
