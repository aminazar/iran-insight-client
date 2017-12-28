import {RouterModule, Routes} from '@angular/router';
import {AssigningAttendanceComponent} from './components/assigning-attendance/assigning-attendance.component';

const Attendance_ROUTES: Routes = [
  {path: 'attendee/:id', component: AssigningAttendanceComponent},
];

export const attendanceRouting = RouterModule.forChild(Attendance_ROUTES);
