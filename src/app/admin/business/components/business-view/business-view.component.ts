import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import * as moment from 'moment';
import {EndingEntityComponent} from '../../../../shared/components/ending-entity/ending-entity.component';

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
              private restService: RestService, public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.bid = +params['bid'] ? +params['bid'] : null;

        if (this.bid)
          this.breadCrumbService.pushChild('Business Details', this.router.url, false);

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
    this.router.navigate(['/admin/business/upsert/' + this.bid]);
  }

  deleteBusiness() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
      data: {
        name: this.data.name || this.data.name_fa,
      }
    });
    rmDialog.afterClosed().subscribe(
      (status) => {
        if (status) {
          this.progressService.enable();
          this.restService.delete('business/' + this.bid).subscribe(
            (data) => {
              this.snackBar.open('Business delete successfully', null, {
                duration: 2000,
              });
              this.progressService.disable();

              this.breadCrumbService.popChild();
            },
            (error) => {
              this.snackBar.open('Cannot delete this Business. Please try again', null, {
                duration: 2700
              });
              this.progressService.disable();
            }
          );
        }
      },
      (err) => {
        console.log('Error in dialog: ', err);
      }
    );
  }

  // deleteBusiness() {
  //   rmDialog.afterClosed().subscribe(
  //     (data) => {
  //
  //       if (data) {
  //         this.progressService.enable();
  //         this.upsertDisabled = true;
  //         this.deleteDisabled = true;
  //
  //         this.restService.delete('delete/' + this.loadedValue.bid).subscribe(
  //           () => {
  //             this.router.navigate(['admin', 'business'])
  //               .then(() => {
  //                 this.snackBar.open('Business is deleted successfully', null, {
  //                   duration: 2000,
  //                 });
  //               });
  //             this.progressService.disable();
  //             this.upsertDisabled = false;
  //             this.deleteDisabled = false;
  //           },
  //           (error) => {
  //             this.progressService.disable();
  //             this.upsertDisabled = false;
  //             this.deleteDisabled = false;
  //           }
  //         );
  //       }
  //     },
  //     (err) => {
  //       console.error('Error in dialog: ', err);
  //     }
  //   );
  // }


  endBusiness() {
    const lcDialog = this.dialog.open(EndingEntityComponent, {
      width: '400px',
      data: {
        name: this.data.name || this.data.name_fa,
      }
    });

    this.progressService.enable();
    lcDialog.afterClosed().subscribe(
      (data) => {
        if (data)
          this.restService.post('business/one/delete/' + this.bid, {
            end_date: moment().format('YYYY-MM-DD'),
          }).subscribe(
            (rs) => {
              this.snackBar.open('The business is ended successfully', null, {
                duration: 2300,
              });
              this.data.end_date = moment().format('YYYY-MM-DD');
              this.progressService.disable();
            },
            (er) => {
              console.error('Cannot end this business: ', er);
              this.progressService.disable();
            }
          );
      },
      (err) => {
        console.error('Error in closing component. Error: ', err);
        this.progressService.disable();
      }
    );
  }

  bizIsEnd() {
    return (this.data && this.data.end_date >= this.data.start_date && moment(this.data.end_date) <= moment());
  }
}
