import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessMembersComponent } from './business-members.component';
import {TestModule} from '../../../../test/test.module';
import {AdminTestRouting} from '../../../admin.routing';
import {ActiveDirective} from '../../directives/active/active.directive';

describe('BusinessMembersComponent', () => {
  let component: BusinessMembersComponent;
  let fixture: ComponentFixture<BusinessMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessMembersComponent,
        ActiveDirective,
      ],
      imports: [
        TestModule,
        AdminTestRouting,
      ]
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
