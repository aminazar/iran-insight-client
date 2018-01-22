import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RestService} from '../../../../shared/services/rest.service';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import * as moment from 'moment';


@Component({
  selector: 'ii-biz-member-view',
  templateUrl: './biz-member-view.component.html',
  styleUrls: ['./biz-member-view.component.scss']
})

export class BizMemberViewComponent implements OnInit, OnDestroy {
  bid: number = null;
  memberId: number = null;
  member: any = null;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private progressService: ProgressService,
              private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
              private router: Router, private restService: RestService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.memberId = +params['mid'] ? +params['mid'] : null;
        this.bid = +params['bid'] ? +params['bid'] : null;
        if (this.memberId) {
          this.breadcrumbService.pushChild('Membership Details', this.router.url, false);
          this.progressService.enable();

          this.restService.get(`joiners/biz/${this.bid}/${this.memberId}`).subscribe(
            (data) => {
              this.member = data[0];
              this.progressService.disable();
            },
            (err) => {
              this.progressService.disable();
              console.error('Cannot get membership info. Error: ', err);
            }
          );
        }
      });
  }

  openForm(id?: number): void {
    this.memberId = id;
    this.router.navigate([`/admin/business/member/form/${this.bid}/${this.memberId}`]);
  }

  deleteMembership(mid: number = null): void {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (status) => {
        if (status) {
          this.progressService.enable();
          this.restService.delete(`/joiner/delete/membership/${this.memberId}`).subscribe(
            (data) => {
              this.snackBar.open('Membership delete successfully', null, {
                duration: 2000,
              });
              this.progressService.disable();

              this.breadcrumbService.popChild();
            },
            (error) => {
              this.snackBar.open('Cannot delete this membership. Please try again', null, {
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

  membershipIsDead() {
    return (this.member && moment(this.member.membership_end_time).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
  }

  ngOnDestroy() {
  }

}
