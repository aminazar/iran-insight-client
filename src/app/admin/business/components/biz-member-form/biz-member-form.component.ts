import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RestService} from '../../../../shared/services/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ii-biz-member-form',
  templateUrl: './biz-member-form.component.html',
  styleUrls: ['./biz-member-form.component.css']
})
export class BizMemberFormComponent implements OnInit, OnDestroy {

  businessId: number = null;
  memberId: number = null;
  isAdd: boolean = true;
  memberObj = {
    name: null,
    id: null,
  };
  positionObj = {
    name: null,
    id: null,
  };
  member: any = null;
  membershipForm: FormGroup;
  loadedValue: any = {};
  anyChanges = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private progressService: ProgressService,
              private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
              private router: Router, private restService: RestService) {
  }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(
      (params) => {
        this.memberId = +params['mid'] ? +params['mid'] : null;
        this.businessId = +params['bid'] ? +params['bid'] : null;
        if (this.memberId)
          this.getmembership();
      });
    this.breadcrumbService.pushChild(this.memberId ? 'Update' : 'Add', this.router.url, false);
  }

  ngOnDestroy() {
  }

  setPerson(data) {
    this.memberObj.id = data.pid;
    this.memberObj.name = (data.display_name_en || data.display_name_fa);
    this.fieldChanged();
  }

  setPosition(data) {
    this.positionObj.id = data.id;
    this.positionObj.name = (data.name || data.name_fa);
    this.fieldChanged();
  }

  directToInvDone() {
    let url = '/admin/person';
    url += '/view/' + this.memberObj.id;
    this.router.navigate([url]);
  }

  getmembership() {
    if (!this.memberId)
      return;
    this.progressService.enable();
    this.restService.get(`joiners/biz/${this.businessId}`).subscribe(
      (data) => {
        this.member = data.filter(el => el.mid === this.memberId)[0];
        console.log(this.member);
        this.progressService.disable();
        this.loadedValue = this.member;
        this.isAdd = false;
        this.memberObj.id = this.member.person_pid;
        this.memberObj.name = this.member.display_name_en;
        this.positionObj.id = this.member.position_id;
        this.positionObj.name = this.member.position_name;
        this.initForm();
      },
      (err) => {
        this.progressService.disable();
        console.error('Cannot get membership info. Error: ', err);
      }
    );
  }

  initForm() {
    this.membershipForm = new FormBuilder().group({
      is_active: [this.loadedValue.is_active ? this.loadedValue.is_active : false, [
        Validators.required,
      ]],
      is_representative: [this.loadedValue.is_representative ? this.loadedValue.is_representative : false, [
        Validators.required,
      ]],
    });

    this.membershipForm.valueChanges.subscribe(
      (dt) => this.fieldChanged(),
      (er) => console.error('Error when subscribing on form valueChanges: ', er)
    );
  }

  fieldChanged() {
    if (!this.loadedValue || !Object.keys(this.loadedValue))
      return;

    this.anyChanges = false;

    Object.keys(this.membershipForm.controls).forEach(el => {
      if (this.membershipForm.controls[el].value != this.loadedValue[el])
        this.anyChanges = true;
    });

    if (this.memberObj.id) {
      if (this.memberObj.id !== this.loadedValue.bid)
        this.anyChanges = true;
    } else if (this.memberObj.id) {
      // const tempId = this.loadedValue[(this.investor === this.investorType.person ? 'pid' : 'oid')];
      // if (this.memberObj.id !== tempId)
      //   this.anyChanges = true;
    }
  }

  modifyMembership() {
    const data: any = {};

    Object.keys(this.membershipForm.controls).forEach(el => {
      data[el] = this.membershipForm.controls[el].value;
    });
    data.mid = this.memberId;
    data.pid = this.memberObj.id;
    data.bid = this.businessId;
    data.position_id = this.positionObj.id;
    this.restService.post('joiner/upsert/membership', data).subscribe((next) => {
        this.snackBar.open(this.isAdd ? 'Membership was added to this business' : 'Membership was updated successfully',
          null, {
          duration: 2300,
        });
        this.anyChanges = false;
        if (!this.memberId) {
          this.membershipForm.reset();
          this.memberObj.id = null;
          this.memberObj.name = null;
          this.positionObj.id = null;
          this.positionObj.name = null;
          this.initForm();
        }
      },
      (err) => {
        console.log('Cannot get business details. Error: ', err);
      }
    );
  }
}
