import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeComponent } from './type.component';
import {TestModule} from '../../test/test.module';
import {AdminTestRouting} from '../admin.routing';
import {ActiveDirective} from './directives/active/active.directive';
import {TypeFormComponent} from './components/type-form/type-form.component';
import {SearchFieldsComponent} from '../../shared/components/search-fields/search-fields.component';

describe('TypeComponent', () => {
  let component: TypeComponent;
  let fixture: ComponentFixture<TypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TypeComponent,
        TypeFormComponent,
        ActiveDirective,
        SearchFieldsComponent,
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
    fixture = TestBed.createComponent(TypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
