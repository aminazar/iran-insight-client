import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyViewComponent } from './consultancy-view.component';

describe('ConsultancyViewComponent', () => {
  let component: ConsultancyViewComponent;
  let fixture: ComponentFixture<ConsultancyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultancyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
