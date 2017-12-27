import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessComponent} from './business.component';
import {TestModule} from '../../test/test.module';
import {AdminTestRouting} from '../admin.routing';
import {SuggestionComponent} from '../../shared/components/suggestion/suggestion.component';
import {SearchFieldsComponent} from '../../shared/components/search-fields/search-fields.component';
import {BusinessInfoComponent} from './components/business-info/business-info.component';
import {BusinessViewComponent} from './components/business-view/business-view.component';

class StubClass {
  innerWidth = 100;
}

fdescribe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessComponent,
        SearchFieldsComponent,
        BusinessInfoComponent,
        SuggestionComponent,
        BusinessViewComponent,
      ],
      imports: [
        TestModule,
        AdminTestRouting,
      ],
      providers: [
        {provide: 'Window', useClass: StubClass}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
