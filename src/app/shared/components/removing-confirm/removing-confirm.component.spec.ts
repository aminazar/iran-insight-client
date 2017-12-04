import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovingConfirmComponent } from './removing-confirm.component';

describe('RemovingConfirmComponent', () => {
  let component: RemovingConfirmComponent;
  let fixture: ComponentFixture<RemovingConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovingConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovingConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
