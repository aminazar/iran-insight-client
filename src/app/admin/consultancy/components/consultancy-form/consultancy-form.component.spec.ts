import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyFormComponent } from './consultancy-form.component';

describe('ConsultancyFormComponent', () => {
  let component: ConsultancyFormComponent;
  let fixture: ComponentFixture<ConsultancyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultancyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
