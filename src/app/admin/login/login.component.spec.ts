import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {TestModule} from '../../test/test.module';
import {By} from '@angular/platform-browser';
import {AuthService} from '../../shared/services/auth.service';
import {AdminTestRouting} from '../admin.routing';


fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usernameEl, pwdEl, submitEl, submitCpnt, authService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      imports: [
        TestModule,
        AdminTestRouting,
      ],
      providers: [],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    usernameEl = fixture.debugElement.query(By.css('[role="username"]')).nativeNode;
    pwdEl = fixture.debugElement.query(By.css('[role="password"]')).nativeNode;
    submitCpnt = fixture.debugElement.query(By.css('[role="submit"]'));
    submitEl = submitCpnt.nativeElement;
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(usernameEl).toBeTruthy();
    expect(usernameEl.value).toBe('');
  });

  it('should have submit button', () => {
    expect(submitEl).toBeTruthy();
    expect(submitEl.innerHTML).toContain('Login');
  });

  it('should keep submit button disabled while username and password are empty', fakeAsync(() => {
    expect(component.form.valid).toBe(false);
  }));

  it('should enable submit button when form is valid, and should submit', fakeAsync(() => {
    const spy = spyOn(component, 'login').and.callThrough();
    const authSpy = spyOn(authService, 'login').and.callFake(() => {});
    const user = 'test@test.com';
    const pwd = 'testtest';
    component.form.controls['username'].setValue(user);
    component.form.controls['password'].setValue(pwd);
    expect(component.form.valid).toBe(true);
    fixture.detectChanges();
    submitEl.click();
    expect(spy.calls.count()).toBe(1);
    expect(authSpy).toHaveBeenCalledWith(user, pwd);
    console.log(spy);
  }));
});
