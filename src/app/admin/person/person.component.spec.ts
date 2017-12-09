import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import {SearchFieldsComponent} from '../../shared/components/search-fields/search-fields.component';
import {TestModule} from '../../test/test.module';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {AdminTestRouting} from '../admin.routing';
import {PersonExpertiseComponent} from "./components/person-expertise/person-expertise.component";
import {PersonPartnershipComponent} from "./components/person-partnership/person-partnership.component";
import {PersonExpertiseInterface} from "./interfaces/personExpertise.interface";

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonComponent,
        SearchFieldsComponent,
        PersonFormComponent,
        PersonExpertiseComponent,
        PersonPartnershipComponent,
      ],
      imports: [
        TestModule,
        AdminTestRouting,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
