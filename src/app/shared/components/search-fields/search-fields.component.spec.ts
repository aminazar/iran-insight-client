import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchFieldsComponent} from './search-fields.component';
import {TestModule} from "../../../test/test.module";

describe('SearchFieldsComponent', () => {
  let component: SearchFieldsComponent;
  let fixture: ComponentFixture<SearchFieldsComponent>;
  let addTrgBtn, trgBtn, rmTrgBtn, phraseField, amountField, ltCB, gtCB, eqCB, isEducationCB,
    isMentorCB, isLeadCB,isActiveCB, startDateField, startDatePicket,
    endDateField, endDatePicket: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestModule],
      providers: [],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
