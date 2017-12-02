import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TestModule} from '../../test/test.module';
import { AdminHomeComponent } from './home.component';
import {AdminTestRouting} from '../admin.routing';
import {LoginComponent} from '../login/login.component';
import {TypeComponent} from '../type/type.component';
import {ActiveDirective} from '../type/active/active.directive';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        TypeComponent,
        ActiveDirective,
      ],
      imports: [
        TestModule,
        AdminTestRouting,
      ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
