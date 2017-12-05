import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import {TestModule} from '../../test/test.module';
import {AdminTestRouting} from '../admin.routing';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {SearchFieldsComponent} from '../../shared/components/search-fields/search-fields.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent, ProductFormComponent, SearchFieldsComponent ],
      imports: [
        TestModule,
        AdminTestRouting,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
