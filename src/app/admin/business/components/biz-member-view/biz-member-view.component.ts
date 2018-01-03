import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RestService} from '../../../../shared/services/rest.service';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';


@Component({
  selector: 'ii-biz-member-view',
  templateUrl: './biz-member-view.component.html',
  styleUrls: ['./biz-member-view.component.css']
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
    console.log('In Member-View Component.')
    this.route.params.subscribe(
      (params) => {
        this.memberId = +params['mid'] ? +params['mid'] : null;
        this.bid = +params['bid'] ? +params['bid'] : null;
        if (this.memberId) {
          this.breadcrumbService.pushChild('Membership Details', this.router.url, false);
          this.progressService.enable();

          this.restService.get(`joiners/biz/${this.bid}`).subscribe(
            (data) => {
              this.member = data.filter(el => el.mid === this.memberId)[0];
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
    console.log('edit');
    this.memberId = id;
    this.router.navigate([`/admin/business/member/form/${this.bid}/${this.memberId}`]);
  }

  deleteMembership(mid: number = null): void {
    console.log('delete');
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '230px'
    });

    rmDialog.afterClosed().subscribe(
      (status) => {
        if (status) {
          this.progressService.enable();
          this.restService.delete(`/joiner/deleteUserOrRepAfterConfirm/${this.memberId}`).subscribe(
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

  ngOnDestroy() {
  }

}
