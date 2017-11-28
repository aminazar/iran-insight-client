import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilterTabComponent } from './filter-tab.component';

describe('SearchTabComponent', () => {
  let component: AdminFilterTabComponent;
  let fixture: ComponentFixture<AdminFilterTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFilterTabComponent ]
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
