import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import { SearchFieldsComponent } from './search-fields.component';
import {TestModule} from '../../../test/test.module';
import {SiteTestRouting} from '../../../site/site.routing';
import {By} from "@angular/platform-browser";

describe('SearchFieldsComponent', () => {
  let component: SearchFieldsComponent;
  let fixture: ComponentFixture<SearchFieldsComponent>;
  let phraseField: any;

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
    phraseField = fixture.debugElement.query(By.css('[role="phrase-field"]')).nativeNode;
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
    let isMentorCB = fixture.debugElement.query(By.css('[role="is-mentor-button"]'));
    expect(isMentorCB).toBe(null);
    expect(phraseField).toBeTruthy();
  });

  it('should have isMentor checkbox on consultancy', () => {
    component.target = 'consultancy';
    component.ngOnInit();
    fixture.detectChanges();
    let isMentorCB = fixture.debugElement.query(By.css('[role="is-mentor-button"]')).nativeNode;
    expect(isMentorCB).toBeTruthy();
  });

  it('should have isEducation on expertise', () => {
    component.target = 'expertise';
    component.ngOnInit();
    fixture.detectChanges();
    let isEducationCB = fixture.debugElement.query(By.css('[role="is-education-button"]')).nativeNode;
    expect(isEducationCB).toBeTruthy();
    expect(component.isEducation).toBe(null);
  });

  it('should show error when amount is not set and setting comparisons', fakeAsync(() => {
    component.target = 'investment';
    component.ngOnInit();
    fixture.detectChanges();
    tick(1000);

    let raisedCounter = 0;
    component.searching.subscribe(
      data => {
        raisedCounter++;
      },
      err => {
        fail(err);
      });

    const spy = spyOn(component, 'checkValidation').and.callThrough();
    let amountField: HTMLElement = fixture.debugElement.query(By.css('[role="amount-field"]')).nativeNode;
    let ltCB: HTMLInputElement = <HTMLInputElement>fixture.debugElement.query(By.css('[role="less-than-button"]')).nativeElement.querySelector('input');
    let gtCB: HTMLInputElement = <HTMLInputElement>fixture.debugElement.query(By.css('[role="greater-than-button"]')).nativeElement.querySelector('input');
    let eqCB: HTMLInputElement = <HTMLInputElement>fixture.debugElement.query(By.css('[role="equal-to-button"]')).nativeElement.querySelector('input');
    ltCB.click();
    fixture.detectChanges();
    tick(1000);

    expect(component.comparison.lt).toBe(true);
    expect(component.comparison.eq).toBe(false);
    expect(component.amount).toBe(null);
    expect(spy.calls.count()).toBe(1);
    expect(raisedCounter).toBe(0);
  }));

  it('should add target', fakeAsync(() => {
    expect(component.target).toBe(null);
    expect(component.targetList).not.toBe(null);

    let trgBtn: HTMLInputElement = <HTMLInputElement>fixture.debugElement.query(By.css('[role="add-target-button"]')).nativeElement.querySelector('button');
    trgBtn.click();
    fixture.detectChanges();
    tick(3000);
    let temp = fixture.debugElement.query(By.css('.mat-menu-content')).nativeElement;
    let addTrgBtn: HTMLInputElement = <HTMLInputElement>temp.querySelector('button');
    let addTargetSpy = spyOn(component, 'addTarget').and.callThrough();

    addTrgBtn.click();
    fixture.detectChanges();
    tick(1000);

    expect(trgBtn).toBeTruthy();
    expect(addTargetSpy.calls.count()).toBe(1);
    expect(component.targets).toContain('business');
    expect(component.targetList).not.toContain('business');
  }));

  it('should trigger correct search data object', fakeAsync(() => {
    component.targets.push('business', 'consultancy');
    component.phrase = 'a';
    component.isLead = false;
    fixture.detectChanges();
    tick(1000);

    let rcvData = null;
    component.searching.subscribe(
      (data) => {
        expect(data.phrase).toBe('a');
        expect(data.options.target.business).toBeTruthy();
        expect(data.options.target.consultancy).toBeTruthy();
        expect(data.options.target.investment).not.toBeTruthy();
        expect(data.options.is_lead).toBe(false);
        expect(data.options.is_education).toBe(null);
        expect(data.options.is_mentor).toBe(null);
        expect(data.options.show_all).toBe(null);
      },
      (err) => {
        console.log(err);
      }
    );

    component.searchOnData();
    fixture.detectChanges();
    tick(2000);

    expect(component.target).toBe(null);
  }));
});
