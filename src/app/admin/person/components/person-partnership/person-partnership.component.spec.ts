import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPartnershipComponent } from './person-partnership.component';
import {TestModule} from '../../../../test/test.module';
import {AdminTestRouting} from '../../../admin.routing';

describe('PersonPartnershipComponent', () => {
  let component: PersonPartnershipComponent;
  let fixture: ComponentFixture<PersonPartnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPartnershipComponent ],
      imports: [
        TestModule,
        AdminTestRouting,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
