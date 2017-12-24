import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {RestService} from '../../../../shared/services/rest.service';
import {IMember} from '../../interfaces/member';

@Component({
  selector: 'ii-business-members',
  templateUrl: './business-members.component.html',
  styleUrls: ['./business-members.component.css']
})
export class BusinessMembersComponent implements OnInit, OnDestroy {

  bid: number;
  members: IMember[] = [];
  memberId: number = null;
  showInDeep = false;
  actionEnum = ActionEnum;
  selectedIndex = 0;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('Members', this.router.url, false);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.bid = params['bid'];
      this.progressService.enable();
      this.restService.get(`joiners/biz/${this.bid}`).subscribe(res => {

        this.members = [];
        res.forEach(member => {

          this.members.push(member);

        });
        console.log('-> ', this.members);
        this.progressService.disable();
      }, err => {
        this.progressService.disable();

      });

    });
  }

  openForm(id: number): void {
    this.memberId = id;
    this.showInDeep = true;
    this.selectedIndex = 0;
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

  ngOnDestroy(): void {
    this.bid = null;
    this.members = null;
    this.memberId = null;
    this.showInDeep = false;
    this.selectedIndex = 0;
  }
}
