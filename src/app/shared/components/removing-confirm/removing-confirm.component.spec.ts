import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RemovingConfirmComponent } from './removing-confirm.component';
import {SiteTestRouting} from "../../../site/site.routing";
import {TestModule} from "../../../test/test.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {By} from "@angular/platform-browser";

class MockDialogRef{

}
class MockDialogData{

}

describe('RemovingConfirmComponent', () => {
  let component: RemovingConfirmComponent;
  let fixture: ComponentFixture<RemovingConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RemovingConfirmComponent,
      ],
      imports: [
        TestModule,
        SiteTestRouting,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useClass: MockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useClass: MockDialogData,
        }
      ],
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
