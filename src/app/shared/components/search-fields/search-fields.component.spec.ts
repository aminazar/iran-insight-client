import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { SearchFieldsComponent } from './search-fields.component';
import {TestModule} from '../../../test/test.module';
import {SiteTestRouting} from '../../../site/site.routing';
import {By} from "@angular/platform-browser";

describe('SearchFieldsComponent', () => {
  let component: SearchFieldsComponent;
  let fixture: ComponentFixture<SearchFieldsComponent>;
  let addTrgBtn, trgBtn, rmTrgBtn, phraseField, amountField, ltCB, gtCB, eqCB, isEducationCB,
    isMentorCB, isLeadCB, isActiveCB, startDateField, startDatePicker,
    endDateField, endDatePicker: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFieldsComponent],
      imports: [
        TestModule,
        SiteTestRouting,
      ],
      providers: [],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    // addTrgBtn = fixture.debugElement.query(By.css('[role="add-target-button"]')).nativeNode;
    // trgBtn = fixture.debugElement.query(By.css('[role="target-button"]')).nativeNode;
    // rmTrgBtn = fixture.debugElement.query(By.css('[role="remove-target-button"]')).nativeNode;
    phraseField = fixture.debugElement.query(By.css('[role="phrase-field"]')).nativeNode;
    // amountField = fixture.debugElement.query(By.css('[role="amount-field"]')).nativeNode;
    // ltCB = fixture.debugElement.query(By.css('[role="less-than-button"]')).nativeNode;
    // gtCB = fixture.debugElement.query(By.css('[role="greater-than-button"]')).nativeNode;
    // eqCB = fixture.debugElement.query(By.css('[role="equal-to-button"]')).nativeNode;
    // isEducationCB = fixture.debugElement.query(By.css('[role="is-education-button"]')).nativeNode;
    // isLeadCB = fixture.debugElement.query(By.css('[role="is-lead-button"]')).nativeNode;
    // isActiveCB = fixture.debugElement.query(By.css('[role="is-active-button"]')).nativeNode;
    // startDateField = fixture.debugElement.query(By.css('[role="start-date-field"]')).nativeNode;
    // startDatePicker = fixture.debugElement.query(By.css('[role="start-date-picker"]')).nativeNode;
    // endDateField = fixture.debugElement.query(By.css('[role="end-date-field"]')).nativeNode;
    // endDatePicker = fixture.debugElement.query(By.css('[role="end-date-picker"]')).nativeNode;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(phraseField).toBeTruthy();
    expect(phraseField.value).toBe('');
  });

  it('should have just phrase element on (business/organization/person)', () => {
    component.target = 'business';
    component.ngOnInit();
    fixture.detectChanges();
    isMentorCB = fixture.debugElement.query(By.css('[role="is-mentor-button"]'));
    expect(isMentorCB).toBe(null);
    expect(phraseField).toBeTruthy();
  });

  it('should have isMentor checkbox on consultancy', () => {
    component.target = 'consultancy';
    component.ngOnInit();
    fixture.detectChanges();
    isMentorCB = fixture.debugElement.query(By.css('[role="is-mentor-button"]')).nativeNode;
    expect(isMentorCB).toBeTruthy();
  });

  it('should have isEducation on expertise', () => {
    component.target = 'expertise';
    component.ngOnInit();
    fixture.detectChanges();
    isEducationCB = fixture.debugElement.query(By.css('[role="is-education-button"]')).nativeNode;
    expect(isEducationCB).toBeTruthy();
    expect(component.isEducation).toBe(null);
  });

  it('should show error when amount is not set and setting comparisons', () => {
    component.target = 'investment';
    component.ngOnInit();
    fixture.detectChanges();

    let raisedCounter = 0;
    component.searching.subscribe(
      data => {
        raisedCounter++;
      },
      err => {
        fail(err);
      });

    const spy = spyOn(component, 'checkValidation').and.callThrough();
    amountField = fixture.debugElement.query(By.css('[role="amount-field"]')).nativeNode;
    ltCB = fixture.debugElement.query(By.css('[role="less-than-button"]')).nativeElement;
    gtCB = fixture.debugElement.query(By.css('[role="greater-than-button"]')).nativeElement;
    eqCB = fixture.debugElement.query(By.css('[role="equal-to-button"]')).nativeElement;
    ltCB.click();
    fixture.detectChanges();
    expect(component.comparison.lt).toBe(true);
    expect(component.comparison.eq).toBe(false);
    expect(component.amount).toBe(null);
    expect(spy.calls.count()).toBe(1);
    // expect(snackSpy.calls.count()).toBe(1);
    // expect(raisedCounter).toBe(0);
  });
});
