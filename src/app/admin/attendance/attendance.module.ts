import {NgModule} from '@angular/core';
import {attendanceRouting} from './attendance.routing';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatSelectModule, MatSnackBarModule,
  MatTabsModule
} from '@angular/material';

import {AssigningAttendanceComponent} from './components/assigning-attendance/assigning-attendance.component';
import {SharedModule} from '../../shared/shared.module';
import {AttendanceListComponent} from './components/attendance-list/attendance-list.component';

@NgModule({
  imports: [
    attendanceRouting,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  declarations: [
    AssigningAttendanceComponent,
    AttendanceListComponent,
  ],

})
export class AttendanceModule {

}
