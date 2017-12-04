import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonExpertiseComponent } from './person-expertise.component';
import {TestModule} from '../../../../test/test.module';
import {AdminTestRouting} from '../../../admin.routing';
import {MatAutocompleteModule} from '@angular/material';

describe('PersonExpertiseComponent', () => {
  let component: PersonExpertiseComponent;
  let fixture: ComponentFixture<PersonExpertiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonExpertiseComponent ],
      imports: [
        TestModule,
        AdminTestRouting,
        MatAutocompleteModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
