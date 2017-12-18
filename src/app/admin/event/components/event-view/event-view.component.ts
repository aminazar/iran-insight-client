import {Component, Inject, OnInit} from '@angular/core';
import {RestService} from "../../../../shared/services/rest.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {ProgressService} from "../../../../shared/services/progress.service";
import * as moment from 'moment';
import {BreadcrumbService} from "../../../../shared/services/breadcrumb.service";

@Component({
  selector: 'ii-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  eventId: number = null;
  event: any = null;

  constructor(private restService: RestService, private router: Router,
              private progressService: ProgressService, private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.eventId = +params['id'] ? +params['id'] : null;
        this.progressService.enable();

        this.restService.get('event/' + this.eventId).subscribe(
          (data) => {
            this.event = data;
            this.event.start_date = this.event.start_date ? moment(this.event.start_date).format('YYYY-MMM-DD') : null;
            this.event.end_date = this.event.end_date ? moment(this.event.end_date).format('YYYY-MMM-DD') : null;
            this.progressService.disable();
          },
          (err) => {
            this.progressService.disable();
            console.error('Cannot get event info. Error: ', err);
          }
        )
      },
      (err) => {
        console.error('Cannot parse params. Error: ', err);
      }
    );
  }

  editEvent(){
    this.router.navigate(['/admin/event/form/' + this.eventId]);
  }

  deleteEvent(){
    this.restService.delete('event/' + this.eventId).subscribe(
      (data) => this.breadcrumbService.popChild(),
      (err) => console.error('Cannot delete this event')
    )
  }
}
