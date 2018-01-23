import {Component, Input, OnInit} from '@angular/core';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RestService} from '../../../../shared/services/rest.service';

@Component({
  selector: 'ii-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  @Input() name = null;
  @Input() eventId: number = null;
  @Input() attendanceList = [];
  @Input() currentAttendanceIds = [];
  @Input() attendanceTypes = null;
  fieldName = null;
  fieldNameFa = null;
  id = null;

  constructor(public dialog: MatDialog, private restService: RestService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    switch (this.name.toLowerCase()) {
      case 'person': {
        this.fieldName = 'display_name_en';
        this.fieldNameFa = 'display_name_fa';
        this.id = 'pid';
      }
        break;
      case 'business': {
        this.fieldName = 'name';
        this.fieldNameFa = 'name_fa';
        this.id = 'bid';
      }
        break;
      case 'organization': {
        this.fieldName = 'name';
        this.fieldNameFa = 'name_fa';
        this.id = 'oid';
      }
        break;
    }
  }

  removeAttendee(id) {
    const rmDialog = this.dialog.open(RemovingConfirmComponent);

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.restService.delete('attendance/' + id).subscribe(
            (dt) => {
              this.snackBar.open('Attendance is delete successfully', null, {
                duration: 2300,
              });

              const personId = this.attendanceList.find(el => el.attendance_id === id).attendee_id;

              this.attendanceList = this.attendanceList.filter(el => el.attendance_id !== id);
              this.currentAttendanceIds = this.currentAttendanceIds.filter(el => el !== personId);
            },
            (error) => {
              this.snackBar.open('Cannot delete this attendance. Please try again', null, {
                duration: 3200,
              });
            }
          );
        }
      },
      (err) => console.error('Error in dialog: ', err)
    );
  }

  addAttendee(attObj) {
    this.restService.put('attends/' + this.eventId, {
      pid: (this.name.toLowerCase() === 'person') ? attObj.pid : null,
      bid: (this.name.toLowerCase() === 'business') ? attObj.bid : null,
      oid: (this.name.toLowerCase() === 'organization') ? attObj.oid : null,
      attendance_type_id: null,
    }).subscribe(
      (data) => {
        this.attendanceList.push({
          name: (this.name.toLowerCase() === 'person') ?
            (attObj.display_name_en || attObj.display_name_fa) :
            (attObj.name || attObj.name_fa),
          attendance_type_id: null,
          attendee_id: attObj[(this.name.toLowerCase() === 'person' ? 'pid' : (this.name.toLowerCase() === 'business' ? 'bid' : 'oid'))],
          attendance_id: data
        });

        this.currentAttendanceIds.push(attObj[(this.name.toLowerCase() === 'person' ?
          'pid' :
          (this.name.toLowerCase() === 'business' ? 'bid' : 'oid'))]);

        this.snackBar.open('Attendance is added', null, {
          duration: 2300,
        });
      },
      (err) => {
        console.error('Cannot add attendance. Error: ', err);
        this.snackBar.open('Cannot add attendance. Please try again', null, {
          duration: 3200,
        });
      }
    );
  }

  updateAttendee(id, data) {
    console.log(this.attendanceList);

    this.restService.post('attendee/' + id, {attendance_type_id: data.value}).subscribe(
      () => {
        this.snackBar.open('Attendee is updated', null, {
          duration: 2300,
        });
      },
      (err) => {
        console.error('Cannot update attendee. Error: ', err);
        this.snackBar.open('Cannot update attendee. Please try again', null, {
          duration: 3200,
        });
      }
    );
  }
}
