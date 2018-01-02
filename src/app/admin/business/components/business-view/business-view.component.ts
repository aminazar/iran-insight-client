import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import * as moment from 'moment';

@Component({
  selector: 'ii-business-view',
  templateUrl: './business-view.component.html',
  styleUrls: ['./business-view.component.css']
})
export class BusinessViewComponent implements OnInit, OnDestroy {
  bid: number;
  data: any = {};

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.bid = +params['bid'] ? +params['bid'] : null;

        if (this.bid)
          this.breadCrumbService.pushChild('View', this.router.url, false);

        this.progressService.enable();
        this.restService.get(`business/oneAll/${this.bid}`).subscribe(
          (res) => {
            this.data = res;
            this.progressService.disable();
          },
          (err) => {
            this.progressService.disable();
          }
        );
      }
    );
  }

  ngOnDestroy() {
  }

  editBusiness() {
    this.router.navigate(['/admin/business/form' + this.bid]);
  }

  deleteBusiness() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '250px'
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data)
          this.restService.post('business/one/delete/' + this.bid, {
            end_date: moment().format('YYYY-MM-DD'),
          }).subscribe(
            (rs) => this.breadCrumbService.popChild(),
            (er) => {
              console.error('Cannot delete this business: ', er);
            }
          );
      },
      (err) => {
        console.error('Error in closing component. Error: ', err);
      }
    );
  }

  bizIsDead() {
    return (this.data && this.data.end_date > this.data.start_date);
  }
}
