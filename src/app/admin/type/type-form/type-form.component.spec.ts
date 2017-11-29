import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeFormComponent } from './type-form.component';
import {TestModule} from "../../../test/test.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

class MockDialogRef{

}
class MockDialogData{

}


describe('TypeFormComponent', () => {
  let component: TypeFormComponent;
  let fixture: ComponentFixture<TypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestModule],
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
    fixture = TestBed.createComponent(TypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
