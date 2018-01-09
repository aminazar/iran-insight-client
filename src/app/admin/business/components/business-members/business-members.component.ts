import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {RestService} from '../../../../shared/services/rest.service';
import {IMember} from '../../interfaces/member';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

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
  showInDeep = false;
  actionEnum = ActionEnum;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService, private dialog: MatDialog) {
  }

  ngOnInit() {
    console.log('In Business-Members Component.');
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
      console.log('--> ', this.members);
      this.progressService.disable();
    }, err => {
      this.progressService.disable();

    });
  }

  openForm(id ?: number): void {
    if (id)
      console.log('edit');
    else
      console.log('add form');
    this.memberId = id;
    this.router.navigate([`/admin/business/member/form/${this.bid}/${this.memberId}`]);
  }

  openView(id: number = null): void {
    console.log('view details');
    this.memberId = id;
    this.router.navigate([`/admin/business/member/${this.bid}/${this.memberId}`]);
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
          this.restService.delete(`/joiner/delete/membership/${mid}`).subscribe(
            (data) => {
              this.snackBar.open('Membership delete successfully', null, {
                duration: 2000,
              });
              this.progressService.disable();

              this.breadCrumbService.popChild();
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

  // deleteMembership(mid: number = null): void {
  //   console.log('delete');
  //   const rmDialog = this.dialog.open(RemovingConfirmComponent, {
  //     width: '330px',
  //     height: '230px'
  //   });
  //
  //   rmDialog.afterClosed().subscribe(
  //     (status) => {
  //       if (status) {
  //         this.progressService.enable();
  //         this.restService.delete(`/joiner/deleteUserOrRepAfterConfirm/${mid}`).subscribe(
  //           (data) => {
  //             this.snackBar.open('Membership delete successfully', null, {
  //               duration: 2000,
  //             });
  //             this.progressService.disable();
  //
  //             this.breadCrumbService.popChild();
  //           },
  //           (error) => {
  //             this.snackBar.open('Cannot delete this membership. Please try again', null, {
  //               duration: 2700
  //             });
  //             this.progressService.disable();
  //           }
  //         );
  //       }
  //     },
  //     (err) => {
  //       console.log('Error in dialog: ', err);
  //     }
  //   );
  // }

  ngOnDestroy(): void {
    this.bid = null;
    this.members = null;
    this.memberId = null;
  }

  applyChanges(data) {
    switch (data.action) {
      case this.actionEnum.add:
        this.members.unshift(data.value);
        this.members = this.members.slice(0, this.members.length - 1);
        break;
      case this.actionEnum.modify:
        this.members[this.members.findIndex(el => el.mid === data.value.pid)] = data.value;
        break;
      case this.actionEnum.delete:
        this.members = this.members.filter(el => el.mid !== data.value);
        this.showInDeep = false;
        this.members = null;
        break;
    }
  }
}

