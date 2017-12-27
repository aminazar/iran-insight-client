import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipViewComponent } from './partnership-view.component';

describe('PartnershipViewComponent', () => {
  let component: PartnershipViewComponent;
  let fixture: ComponentFixture<PartnershipViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnershipViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
