import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {RestService} from '../../../../shared/services/rest.service';
import {IMember} from '../../../../shared/interfaces/member';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import * as moment from 'moment';

@Component({
  selector: 'ii-org-members',
  templateUrl: './org-members.component.html',
  styleUrls: ['./org-members.component.scss']
})
export class OrgMembersComponent implements OnInit, OnDestroy {

  oid: number;
  members: IMember[] = [];
  memberId: number = null;
  add = false;
  offset = 0;
  limit = 8;
  totalOrgMembers: number = null;
  orgMembers = [];
  rows = [];
  aligningObj = {};

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService, private dialog: MatDialog) { }

  ngOnInit() {
    this.breadCrumbService.pushChild('Members', this.router.url, false);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.oid = params['oid'];
      this.getOrgMember();
    });
  }

  openForm(id ?: number): void {
    this.memberId = id;
    this.router.navigate([`/admin/organization/member/form/${this.oid}/${this.memberId}`]);
  }

  openView(id: number = null): void {
    this.memberId = id;
    this.router.navigate([`/admin/organization/member/${this.oid}/${this.memberId}`]);
  }

  deleteMembership(mid: number = null): void {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
      height: '230px'
    });

    rmDialog.afterClosed().subscribe(
      (status) => {
        if (status) {
          this.progressService.enable();
          this.restService.delete(`/joiner/delete/membership/${mid}`).subscribe(
            (data) => {
              this.memberId = null;
              this.snackBar.open('Membership delete successfully', null, {
                duration: 2000,
              });
              this.progressService.disable();
              this.getOrgMember();
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

  changeOffset(data) {
    this.limit = data.pageSize ? data.pageSize : 10;
    this.offset = data.pageIndex * this.limit;
    this.getOrgMember();
  }

  getOrgMember() {
    this.progressService.enable();
    this.restService.get(`joiners/org/${this.oid}/${this.offset}/${this.limit}`).subscribe(
      (data) => {
        this.orgMembers = data;
        this.totalOrgMembers = this.orgMembers && this.orgMembers.length > 0 ? parseInt(this.orgMembers[0].total, 10) : 0;
        this.aligningItems();
        this.progressService.disable();
      },
      (err) => {
        console.error('Cannot get data', err);
        this.snackBar.open('Cannot get data. Please check your connection', null, {
          duration: 3000,
        });
        this.progressService.disable();
      }
    );
  }

  aligningItems() {
    if (this.totalOrgMembers <= 0) {
      this.aligningObj = {};
      this.rows = [];
      return;
    }

    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.orgMembers.length > 0 ? {0: []} : {};
    this.orgMembers.forEach(el => {
      if (colCounter > 3) {
        this.aligningObj[++rowCounter] = [];
        colCounter = 0;
      }

      this.aligningObj[rowCounter].push(el);
      colCounter++;
    });

    this.rows = Object.keys(this.aligningObj);
  }

  ngOnDestroy(): void {
    this.oid = null;
    this.members = null;
    this.memberId = null;
  }

  membershipIsDead(m) {
    return (m && moment(m.membership_end_time).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
  }

  select(id) {
    if (this.memberId === id)
      this.memberId = null;
    else
      this.memberId = id;
  }
}
