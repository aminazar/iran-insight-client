import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndercontructionComponent } from './undercontruction.component';

describe('UndercontructionComponent', () => {
  let component: UndercontructionComponent;
  let fixture: ComponentFixture<UndercontructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndercontructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndercontructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
