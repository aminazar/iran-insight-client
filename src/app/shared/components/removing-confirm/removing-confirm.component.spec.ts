import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovingConfirmComponent } from './removing-confirm.component';
import {AdminTestRouting} from '../../../admin/admin.routing';
import {TestModule} from '../../../test/test.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


class MockDialogRef {

}
class MockDialogData {

}

describe('RemovingConfirmComponent', () => {
  let component: RemovingConfirmComponent;
  let fixture: ComponentFixture<RemovingConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovingConfirmComponent ],
      imports: [
        TestModule,
        AdminTestRouting,
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
