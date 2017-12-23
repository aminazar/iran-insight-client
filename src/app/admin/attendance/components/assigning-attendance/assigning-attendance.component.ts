import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../../../../shared/services/rest.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {BreadcrumbService} from "../../../../shared/services/breadcrumb.service";

@Component({
  selector: 'ii-assigning-attendance',
  templateUrl: './assigning-attendance.component.html',
  styleUrls: ['./assigning-attendance.component.css']
})
export class AssigningAttendanceComponent implements OnInit {
  userAttendanceList = [];
  personAttendanceList = [];
  businessAttendanceList = [];
  organizationAttendanceList = [];
  eventId: number = null;
  currentPersonAttendanceIds: number[] = [];
  currentBusinessAttendanceIds: number[] = [];
  currentOrganizationAttendanceIds: number[] = [];

  constructor(private route: ActivatedRoute, private restService: RestService,
              private snackBar: MatSnackBar, private breadcrumbService: BreadcrumbService,
              private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.eventId = +params['id'] ? +params['id'] : null;

        if(this.eventId){
          this.breadcrumbService.pushChild("Event Attendee", this.router.url, false);
          this.getEventAttendance();
        }
      },
      (err) => console.error('Cannot parse params')
    );
  }

  getEventAttendance(){
    if(!this.eventId)
      return;

    this.restService.get('')
  }

  removePersonAttendance(id){

  }

  addAttendance(attObj){

  }
}
