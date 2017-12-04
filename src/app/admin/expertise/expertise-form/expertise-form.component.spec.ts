import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseFormComponent } from './expertise-form.component';
import {TestModule} from '../../../test/test.module';
import {AdminTestRouting} from '../../admin.routing';

describe('ExpertiseFormComponent', () => {
  let component: ExpertiseFormComponent;
  let fixture: ComponentFixture<ExpertiseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertiseFormComponent ],
      imports: [
        TestModule,
        AdminTestRouting,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertiseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
