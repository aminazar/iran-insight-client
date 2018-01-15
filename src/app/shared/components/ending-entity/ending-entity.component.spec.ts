import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingEntityComponent } from './ending-entity.component';

describe('EndingEntityComponent', () => {
  let component: EndingEntityComponent;
  let fixture: ComponentFixture<EndingEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndingEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
