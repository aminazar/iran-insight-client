import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {RestService} from '../../../../shared/services/rest.service';
import {MatDialog} from '@angular/material';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import * as moment from 'moment';

@Component({
  selector: 'ii-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.css']
})
export class OrganizationViewComponent implements OnInit {
  oid: number = null;
  data: any = {};

  constructor(private router: Router, private breadcrumbService: BreadcrumbService,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.oid = +params['oid'] ? +params['oid'] : null;

        if (this.oid)
          this.breadcrumbService.pushChild('View', this.router.url, false);

        this.progressService.enable();
        this.restService.get(`organization/${this.oid}`).subscribe(
          (res) => {
            this.data = res[0];
            this.data.org_start_date = this.data.org_start_date ? moment(this.data.org_start_date).format('YYYY-MM-DD') : null;
            this.data.org_end_date = this.data.org_end_date ? moment(this.data.org_end_date).format('YYYY-MM-DD') : null;
            this.progressService.disable();
          },
          (err) => {
            this.progressService.disable();
          }
        );
      }
    );
  }

  editOrg() {
    this.router.navigate(['admin/organization/form/' + this.oid]);
  }

  deleteOrg() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if(data)
          this.restService.post('organization/one/delete/' + this.oid, {
            end_date: moment().format('YYYY-MM-DD'),
          }).subscribe(
            (rs) => this.breadcrumbService.popChild(),
            (er) => {
              console.error('Cannot delete this organization: ', er);
            }
          );
      },
      (err) => {
        console.error('Error in closing component. Error: ', err);
      }
    );
  }

  orgIsDead() {
    return (this.data && this.data.org_end_date > this.data.org_start_date);
  }
}
