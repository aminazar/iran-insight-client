import {NgModule} from "@angular/core";
import {attendanceRouting} from "./attendance.routing";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDialogModule, MatIconModule, MatSnackBarModule} from "@angular/material";

import {AssigningAttendanceComponent} from "./components/assigning-attendance/assigning-attendance.component";

@NgModule({
  imports: [
    attendanceRouting,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  declarations: [
    AssigningAttendanceComponent,
  ],

})
export class AttendanceModule{

}
