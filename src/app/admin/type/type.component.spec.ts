import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeComponent } from './type.component';
import {TestModule} from '../../test/test.module';
import {AdminTestRouting} from '../admin.routing';
import {ActiveDirective} from './active/active.directive';
import {TypeFormComponent} from './type-form/type-form.component';

describe('TypeComponent', () => {
  let component: TypeComponent;
  let fixture: ComponentFixture<TypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TypeComponent,
        TypeFormComponent,
        ActiveDirective,
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
