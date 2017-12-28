import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInfoComponent } from './business-info.component';
import {AdminTestRouting} from '../../../admin.routing';
import {TestModule} from '../../../../test/test.module';
import {SuggestionComponent} from '../../../../shared/components/suggestion/suggestion.component';

describe('BusinessInfoComponent', () => {
  let component: BusinessInfoComponent;
  let fixture: ComponentFixture<BusinessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessInfoComponent,
        SuggestionComponent,
      ],
      imports: [
        TestModule,
        AdminTestRouting,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
