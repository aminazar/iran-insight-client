import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilterTabComponent } from './filter-tab.component';
import {TestModule} from "../../../test/test.module";

describe('SearchTabComponent', () => {
  let component: AdminFilterTabComponent;
  let fixture: ComponentFixture<AdminFilterTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFilterTabComponent ],
      imports: [TestModule],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
