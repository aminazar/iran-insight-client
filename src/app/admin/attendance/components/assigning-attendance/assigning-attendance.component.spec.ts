import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigningAttendanceComponent } from './assigning-attendance.component';

describe('AssigningAttendanceComponent', () => {
  let component: AssigningAttendanceComponent;
  let fixture: ComponentFixture<AssigningAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigningAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigningAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
