import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

enum AttendeeType {
  person,
  business,
  organization,
}

@Component({
  selector: 'ii-assigning-attendance',
  templateUrl: './assigning-attendance.component.html',
  styleUrls: ['./assigning-attendance.component.css']
})
export class AssigningAttendanceComponent implements OnInit {
  personAttendanceList = [];
  businessAttendanceList = [];
  organizationAttendanceList = [];
  eventId: number = null;
  currentPersonAttendanceIds: number[] = [];
  currentBusinessAttendanceIds: number[] = [];
  currentOrganizationAttendanceIds: number[] = [];
  attendanceTypes = [];

  constructor(private route: ActivatedRoute, private restService: RestService,
              private snackBar: MatSnackBar, private breadcrumbService: BreadcrumbService,
              private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.eventId = +params['id'] ? +params['id'] : null;

        if (this.eventId) {
          this.breadcrumbService.pushChild('Event Attendee', this.router.url, false);
          this.getEventAttendance();
          this.getAttendanceTypes();
        }
      },
      (err) => console.error('Cannot parse params')
    );
  }

  getEventAttendance() {
    if (!this.eventId)
      return;

    this.restService.get('attendee/' + this.eventId).subscribe(
      (data) => {
        this.personAttendanceList = data.person ? data.person.map(el => {
          return {
            name: el.name || el.name_fa,
            attendee_id: el.attendee_id,
            attendance_type_id: el.attendance_type_id,
            attendance_id: el.attendance_id,
          };
        }) : [];
        this.businessAttendanceList = data.business ? data.business.map(el => {
          return {
            name: el.name || el.name_fa,
            attendee_id: el.attendee_id,
            attendance_type_id: el.attendance_type_id,
            attendance_id: el.attendance_id,
          };
        }) : [];
        this.organizationAttendanceList = data.organization ? data.organization.map(el => {
          return {
            name: el.name || el.name_fa,
            attendee_id: el.attendee_id,
            attendance_type_id: el.attendance_type_id,
            attendance_id: el.attendance_id,
          };
        }) : [];
        this.currentPersonAttendanceIds = this.personAttendanceList.map(el => el.attendee_id);
        this.currentBusinessAttendanceIds = this.businessAttendanceList.map(el => el.attendee_id);
        this.currentOrganizationAttendanceIds = this.organizationAttendanceList.map(el => el.attendee_id);
      },
      (err) => {
        console.error('Cannot get attendees of this event. Error: ', err);
      }
    );
  }

  getAttendanceTypes() {
    this.restService.get('attendance/types').subscribe(
      (data) => {
        this.attendanceTypes = data;
      },
      (err) => {
        console.error('Cannot get attendance types. Error: ', err);
      }
    );
  }
}
