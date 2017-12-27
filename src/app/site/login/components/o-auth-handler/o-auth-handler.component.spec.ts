import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuthHandlerComponent } from './o-auth-handler.component';

describe('OAuthHandlerComponent', () => {
  let component: OAuthHandlerComponent;
  let fixture: ComponentFixture<OAuthHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OAuthHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuthHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
