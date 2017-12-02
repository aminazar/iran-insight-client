import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPartnershipComponent } from './person-partnership.component';

describe('PersonPartnershipComponent', () => {
  let component: PersonPartnershipComponent;
  let fixture: ComponentFixture<PersonPartnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPartnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
