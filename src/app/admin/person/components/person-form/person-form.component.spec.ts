import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { PersonFormComponent } from './person-form.component';
import {TestModule} from '../../../../test/test.module';
import {AdminTestRouting} from '../../../admin.routing';
import {By} from '@angular/platform-browser';
import {AuthService} from '../../../../shared/services/auth.service';
import {Observable} from 'rxjs/Observable';
import {PromiseObservable} from 'rxjs/observable/PromiseObservable';
import {ProgressService} from '../../../../shared/services/progress.service';

class mockService {
  enable(){
    return;
  }

  disable(){
    return;
  }
}

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
      ],
      providers: [
        {
          provide: ProgressService, useClass: mockService
        }
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

  it('should add be disabled when username is invalid or empty', fakeAsync(() => {
    expect(component.formId).toBe(null);

    const btn = fixture.debugElement.query(By.css('[role="submit-button"]')).nativeElement;
    const addBtn: HTMLInputElement = <HTMLInputElement>btn.querySelector('button');
    const label: HTMLElement = <HTMLElement>btn.querySelector('span');

    fixture.detectChanges();
    tick(1000);

    expect(label.innerText).toBe('Add');
    expect(addBtn.disabled).toBe(true);
    expect(component.form.valid).toBe(false);
  }));

  it('should update be disable when no changes in inputs', fakeAsync(() => {
    const authService = TestBed.get(AuthService);
    const authSpy = spyOn(authService, 'getPersonInfo').and.callFake(() => {
      return PromiseObservable.create(Promise.resolve([{
        username: 'a@ii.com',
        firstname_en: '',
        firstname_fa: '',
        surname_en: '',
        surname_fa: '',
        image: '',
        address_en: '',
        address_fa: '',
        phone_no: '',
        mobile_no: '',
        birth_date: '',
        display_name_en: '',
        display_name_fa: '',
        notify_period: 'd',
      }]));
    });
    let spy = spyOn(component, 'initPerson').and.callThrough();

    component.formId = 1;
    fixture.detectChanges();
    tick(1000);

    let btn = fixture.debugElement.query(By.css('[role="submit-button"]')).nativeElement;
    let updateBtn: HTMLInputElement = <HTMLInputElement>btn.querySelector('button');
    let label: HTMLElement = <HTMLElement>btn.querySelector('span');
    fixture.detectChanges();
    tick(1000);

    expect(spy.calls.count()).toBe(1);
    expect(authSpy).toHaveBeenCalledWith(1);
    expect(label.innerText).toBe('Update');
    expect(updateBtn.disabled).toBe(true);
    expect(component.form.valid).toBe(true);
  }));

  it('should update person', fakeAsync(() => {
    let authService = TestBed.get(AuthService);
    let getSpy = spyOn(authService, 'getPersonInfo').and.callFake(() => {
      return PromiseObservable.create(Promise.resolve([{
        username: 'a@ii.com',
        firstname_en: '',
        firstname_fa: '',
        surname_en: '',
        surname_fa: '',
        image: '',
        address_en: '',
        address_fa: '',
        phone_no: '',
        mobile_no: '',
        birth_date: '',
        display_name_en: '',
        display_name_fa: '',
        notify_period: 'd',
      }]));
    });
    let authSpy = spyOn(authService, 'setUserProfile').and.callFake(() => {
      return PromiseObservable.create(Promise.resolve({pid: 1}))
    });
    let spy = spyOn(component, 'modifyUser').and.callThrough();

    component.formId = 1;
    fixture.detectChanges();
    tick(1000);

    let fieldChangeSpy = spyOn(component, 'fieldChanged').and.callThrough();

    component.form.controls['firstname_en'].setValue('Ali');
    fixture.detectChanges();
    tick(1000);

    let btn = fixture.debugElement.query(By.css('[role="submit-button"]')).nativeElement;
    let updateBtn: HTMLInputElement = <HTMLInputElement>btn.querySelector('button');
    let label: HTMLElement = <HTMLElement>btn.querySelector('span');

    expect(component.anyChanges).toBe(true, 'AnyChanges is not true');

    updateBtn.click();
    tick(2000);
    fixture.detectChanges();

    expect(getSpy).toHaveBeenCalled();
    expect(authSpy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);
    expect(fieldChangeSpy.calls.count()).toBe(1);
    expect(label.innerText).toBe('Update');
    fixture.detectChanges();
    expect(component.form.valid).toBe(true);
  }));
});
