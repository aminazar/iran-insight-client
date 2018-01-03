import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RestService} from '../../../../shared/services/rest.service';

@Component({
  selector: 'ii-biz-member-form',
  templateUrl: './biz-member-form.component.html',
  styleUrls: ['./biz-member-form.component.css']
})
export class BizMemberFormComponent implements OnInit, OnDestroy {

  // @Input()
  // set memberId(id) {
  //   this._memberId = id;
  // }
  // get memberId() {
  //   return this._memberId;
  // }
  //
  businessId: number = null;
  memberId: number = null;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private progressService: ProgressService,
              private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
              private router: Router, private restService: RestService) { }

  ngOnInit() {
    console.log('In Business-Form Component.');
    this.route.params.subscribe(
      (params) => {
        this.memberId = +params['mid'] ? +params['mid'] : null;
        this.businessId = +params['bid'] ? +params['bid'] : null;
      });
    this.breadcrumbService.pushChild(this.memberId ? 'Update' : 'Add' , this.router.url, false);
  }

  ngOnDestroy() {
  }
}
