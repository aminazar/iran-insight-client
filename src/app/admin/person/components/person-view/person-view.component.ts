import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgressService} from '../../../../shared/services/progress.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {MatDialog} from '@angular/material';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

@Component({
  selector: 'ii-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  personId: number = null;
  person: any = null;

  constructor(private authService: AuthService, private router: Router,
              private progressService: ProgressService, private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.personId = +params['id'] ? +params['id'] : null;
        if (this.personId) {
          this.breadcrumbService.pushChild('Person Details', this.router.url, false);
          this.progressService.enable();

          this.authService.getPersonInfo(this.personId).subscribe(
            (data) => {
              this.person = data[0];
              this.person.birth_date = this.person.birth_date ? moment(this.person.birth_date).format('YYYY-MMM-DD') : null;
              this.person.notify_period = this.getNofityPeroid(this.person.notify_period);
              this.progressService.disable();
            },
            (err) => {
              this.progressService.disable();
              console.error('Cannot get person info. Error: ', err);
            }
          );
        }
      }
    );
  }

  editPerson() {
    this.router.navigate(['/admin/person/form/' + this.personId]);
  }

  deletePerson() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (dt) => {
        if (dt)
          this.authService.deletePerson(this.personId).subscribe(
            (data) => this.breadcrumbService.popChild(),
            (err) => console.error('Cannot delete this person')
          );
      },
      (err) => console.error('An error occurred when subscribing afterClosed dialog method: ', err)
    );
  }

  getNofityPeroid(notify_peroid) {
    switch (notify_peroid) {
      case 'd':
        return 'Daily';
      case 'w':
        return 'Weekly';
      case 'm':
        return 'Monthly';
      case 'n':
        return 'Never';
    }
  }
}
