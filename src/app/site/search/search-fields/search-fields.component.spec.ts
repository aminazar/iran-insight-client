import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFieldsComponent } from './search-fields.component';
import {TestModule} from "../../../test/test.module";

describe('SearchFieldsComponent', () => {
  let component: SearchFieldsComponent;
  let fixture: ComponentFixture<SearchFieldsComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
