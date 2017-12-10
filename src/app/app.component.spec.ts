import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TestModule} from './test/test.module';
import {SiteTestRouting} from './site/site.routing';
import {HeaderComponent} from './shared/components/header/header.component';
import {BreadcrumbComponent} from './shared/components/breadcrumb/breadcrumb.component';



describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, BreadcrumbComponent],
      imports: [
        TestModule,
        SiteTestRouting,
      ],
      providers: [],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Iran Insight'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Iran');
  }));
  it('should render title in a span tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('span')[0].innerText).toContain('Iran');
  }));
});
