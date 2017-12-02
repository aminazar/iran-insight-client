import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonExpertiseComponent } from './person-expertise.component';

describe('PersonExpertiseComponent', () => {
  let component: PersonExpertiseComponent;
  let fixture: ComponentFixture<PersonExpertiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonExpertiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
