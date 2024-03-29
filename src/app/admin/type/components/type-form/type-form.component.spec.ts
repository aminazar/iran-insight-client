import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeFormComponent } from './type-form.component';
import {TestModule} from "../../../../test/test.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SearchFieldsComponent} from '../../../../shared/components/search-fields/search-fields.component';
import {AdminTestRouting} from "../../../admin.routing";

class MockDialogRef{

}
class MockDialogData{

}


describe('TypeFormComponent', () => {
  let component: TypeFormComponent;
  let fixture: ComponentFixture<TypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchFieldsComponent,
        TypeFormComponent,
      ],
      imports: [TestModule, AdminTestRouting],
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
