import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseComponent } from './expertise.component';
import {TestModule} from '../../test/test.module';
import {AdminTestRouting} from '../admin.routing';
import {ExpertiseFormComponent} from './expertise-form/expertise-form.component';
import {UnderConstructionComponent} from "../../shared/components/underConstruction/under-construction.component";

describe('ExpertiseComponent', () => {
  let component: ExpertiseComponent;
  let fixture: ComponentFixture<ExpertiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExpertiseComponent,
      ],
      imports: [
        TestModule,
        AdminTestRouting,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
