import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {RestService} from '../../../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import * as moment from 'moment';
import {EndingEntityComponent} from '../../../../shared/components/ending-entity/ending-entity.component';

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
              private restService: RestService, public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.oid = +params['oid'] ? +params['oid'] : null;

        if (this.oid)
          this.breadcrumbService.pushChild('Organization Details', this.router.url, false);

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

  endOrg() {
    const lcDialog = this.dialog.open(EndingEntityComponent, {
      width: '400px',
      data: {
        name: this.data.name || this.data.name_fa,
      }
    });

    lcDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.restService.post('organization/one/delete/' + this.oid, {
            end_date: moment().format('YYYY-MM-DD'),
          }).subscribe(
            (rs) => {
              this.snackBar.open('The organization is ended successfully', null, {
                duration: 2300,
              });
              this.data.org_end_date = moment().format('YYYY-MM-DD');
              this.progressService.disable();
            },
            (er) => {
              console.error('Cannot delete this organization: ', er);
              this.progressService.disable();
            }
          );
        }
      },
      (err) => {
        console.error('Error in closing component. Error: ', err);
      }
    );
  }

  deleteOrg() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
      data: {
        name: this.data.name || this.data.name_fa,
      }
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.restService.delete('organization/' + this.oid).subscribe(
            (rs) => this.breadcrumbService.popChild(),
            (er) => {
              console.error('Cannot delete this organization: ', er);
              this.progressService.disable();
            }
          );
        }
      },
      (err) => {
        console.error('Error in closing component. Error: ', err);
      }
    );
  }

  orgIsEnd() {
    return (this.data && this.data.org_end_date >= this.data.org_start_date && moment(this.data.org_end_date) <= moment());
  }
}
