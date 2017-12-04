import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormComponent } from './person-form.component';
import {TestModule} from '../../../../test/test.module';
import {AdminTestRouting} from '../../../admin.routing';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonFormComponent
      ],
      imports: [
        TestModule,
        AdminTestRouting,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
