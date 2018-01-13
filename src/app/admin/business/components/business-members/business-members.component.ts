import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {RestService} from '../../../../shared/services/rest.service';
import {IMember} from '../../../../shared/interfaces/member';
import {RemovingConfirmComponent} from "../../../../shared/components/removing-confirm/removing-confirm.component";

@Component({
  selector: 'ii-business-members',
  templateUrl: './business-members.component.html',
  styleUrls: ['./business-members.component.css']
})
export class BusinessMembersComponent implements OnInit, OnDestroy {

  bid: number;
  members: IMember[] = [];
  memberId: number = null;
  add = false;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService, private dialog: MatDialog) {
  }

  ngOnInit() {

    this.breadCrumbService.pushChild('Members', this.router.url, false);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.bid = params['bid'];
      this.getBizMember();
    });
  }

  getBizMember() {
    this.progressService.enable();
    this.restService.get(`joiners/biz/${this.bid}`).subscribe(res => {
      this.members = [];
      res.forEach(member => {
        this.members.push(member);
      });
      this.progressService.disable();
    }, err => {
      this.progressService.disable();

    });
  }

  openForm(id ?: number): void {
    this.memberId = id;
    this.router.navigate([`/admin/business/member/form/${this.bid}/${this.memberId}`]);
  }

  openView(id: number = null): void {
    this.memberId = id;
    this.router.navigate([`/admin/business/member/${this.bid}/${this.memberId}`]);
  }

  deleteMembership(mid: number = null): void {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '230px'
    });

    rmDialog.afterClosed().subscribe(
      (status) => {
        if (status) {
          this.progressService.enable();
          this.restService.delete(`/joiner/delete/membership/${mid}`).subscribe(
            (data) => {
              this.snackBar.open('Membership delete successfully', null, {
                duration: 2000,
              });
              this.progressService.disable();
              this.getBizMember();
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

  ngOnDestroy(): void {
    console.log('biz-member component destroyed');
    this.bid = null;
    this.members = null;
    this.memberId = null;
  }
}

