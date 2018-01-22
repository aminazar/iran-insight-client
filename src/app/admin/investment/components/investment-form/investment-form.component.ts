import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProgressService} from '../../../../shared/services/progress.service';
import {AuthService} from '../../../../shared/services/auth.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {CurrencyList} from '../../../../shared/constants/currency';

enum InvestorType {
  person,
  organization,
}

@Component({
  selector: 'ii-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent implements OnInit {
  id = null;
  isPerson = false;
  isBiz = false;
  isOrg = false;
  isInvestor = false;
  investmentId = null;
  investmentForm: FormGroup;
  loadedValue: any = {};
  upsertBtnShouldDisabled = false;
  deleteBtnShouldDisabled = false;
  anyChanges = false;
  investorType = InvestorType;
  investor = this.investorType.person;
  investorObj = {
    name: null,
    id: null,
  };
  investmentObj = {
    name: null,
    id: null,
  };
  currencyList = CurrencyList;

  constructor(private restService: RestService, private breadcrumbService: BreadcrumbService,
              private router: Router, private route: ActivatedRoute,
              private progressService: ProgressService, private authService: AuthService,
              private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(
      (params) => {
        this.id = params['id'] ? +params['id'] : null;
        this.investmentId = params['invid'] ? +params['invid'] : null;
        this.isInvestor = params['is_investor'] ? (params['is_investor'] === 'true' ? true : false) : false;
        this.isBiz = params['type'] ? false : true;
        this.isPerson = params['type'] ? (params['type'].toLowerCase() === 'person' ? true : false) : false;
        this.isOrg = params['type'] ? (params['type'].toLowerCase() === 'organization' ? true : false) : false;

        if (this.investmentId)
          this.getInvestment();

        this.breadcrumbService.pushChild((this.investmentId ? 'Update' : 'Add') + ' Investment', this.router.url, false);
      },
      (err) => {
        console.error('Cannot parse parameters from url: ', err);
      }
    );
  }

  initForm() {
    this.investmentForm = new FormBuilder().group({
      amount: [this.loadedValue.amount, [
        Validators.required,
        Validators.pattern(/^-?\d*(\.\d+)?$/),
      ]],
      currency: [this.loadedValue.currency, [
        Validators.required,
      ]],
      is_lead: [this.loadedValue.is_lead ? this.loadedValue.is_lead : false, [
        Validators.required
      ]],
      is_confirmed: [this.loadedValue.is_confirmed ? this.loadedValue.is_confirmed : false, [
        Validators.required,
      ]],
      investment_cycle: [this.loadedValue.investment_cycle ? this.loadedValue.investment_cycle : null, [
        Validators.min(1),
      ]],
    });

    this.investmentForm.valueChanges.subscribe(
      (dt) => this.fieldChanged(),
      (er) => console.error('Error when subscribing on form valueChanges: ', er)
    );
  }

  getInvestment() {
    if (!this.investmentId)
      return;

    this.progressService.enable();
    this.restService.get('investment/' + this.investmentId).subscribe(
      (data) => {
        this.loadedValue = data;
        if (this.isInvestor) {
          this.investmentObj.id = data.bid;
          this.investmentObj.name = data.biz_name || data.biz_name_fa;
        } else {
          if (data.pid) {
            this.investorObj.id = data.pid;
            this.investorObj.name = data.person_display_name || data.perosn_display_name_fa;
            this.investor = this.investorType.person;
          } else if (data.oid) {
            this.investorObj.id = data.oid;
            this.investorObj.name = data.org_name || data.org_name_fa;
            this.investor = this.investorType.organization;
          }
        }

        this.initForm();
        this.progressService.disable();
      },
      (err) => {
        console.error('Cannot get investment details');
        this.progressService.disable();
      }
    );
  }

  modifyInvestment() {
    if (!this.investorObj.id && !this.investmentObj.id)
      return;

    const data: any = {};

    Object.keys(this.investmentForm.controls).forEach(el => {
      data[el] = this.investmentForm.controls[el].value;
    });

    if (this.investmentForm.controls['is_confirmed'].value)
      data.confirmed_by = this.authService.userId.getValue();

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    let url = '';
    if (this.isInvestor) {
      url = (this.isPerson ? 'personalInvestment' : 'orgInvestment') +
        '/' + (this.investmentId ? this.investmentId + '/' : '') +
        this.investmentObj.id + '/' + this.id;
    } else {
      url = (this.investor === this.investorType.person ? 'personalInvestment' : 'orgInvestment') +
        '/' + (this.investmentId ? this.investmentId + '/' : '') +
        this.id + '/' + this.investorObj.id;
    }

    (this.investmentId ?
      this.restService.post(url, data) :
      this.restService.put(url, data))
      .subscribe(
        (rs) => {
          if (!this.investmentId) {
            this.initForm();
            this.investorObj = {
              id: null,
              name: null,
            };
            this.investmentObj = {
              id: null,
              name: null,
            };
          } else {
            Object.keys(data).forEach(el => this.loadedValue[el] = data[el]);
            this.loadedValue.id = rs;
          }

          this.snackBar.open('The investment is ' + (this.investmentId ? 'updated' : 'added') + ' successfully', null, {
            duration: 2300,
          });
          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;

          this.anyChanges = false;
        },
        (err) => {
          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;
        }
      );
  }

  deleteInvestment() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data)
          this.restService.delete('investment/' + this.investmentId).subscribe(
            (rs) => {
              this.snackBar.open('The investment is deleted successfully', null, {
                duration: 2300,
              });
              this.breadcrumbService.popChild();
            },
            (er) => {
              console.error('Cannot delete this investment');
            }
          );
      },
      (err) => {
        console.error('Error when closing dialog: ', err);
      }
    );
  }

  setInvestor(data) {
    this.investorObj.id = this.investor === this.investorType.person ?
      data.pid :
      data.oid;
    this.investorObj.name = this.investor === this.investorType.person ?
      (data.display_name_en || data.display_name_fa) :
      (data.name || data.name_fa);
    this.fieldChanged();
  }

  setTargetBusiness(data) {
    this.investmentObj.id = data.bid;
    this.investmentObj.name = data.name || data.name_fa;
    this.fieldChanged();
  }

  directToInvDone() {
    let url = '/admin/';

    if (this.isInvestor)
      url += 'business/view/' + this.investmentObj.id;
    else {
      if (this.investor === this.investorType.person)
        url += 'person';
      else if (this.investor === this.investorType.organization)
        url += 'organization';

      url += '/view/' + this.investorObj.id;
    }

    this.router.navigate([url]);
  }

  fieldChanged() {
    if (!this.loadedValue || !Object.keys(this.loadedValue))
      return;

    this.anyChanges = false;

    Object.keys(this.investmentForm.controls).forEach(el => {
      if (this.investmentForm.controls[el].value !== this.loadedValue[el])
        this.anyChanges = true;
    });

    if (this.investmentObj.id) {
      if (this.investmentObj.id !== this.loadedValue.bid)
        this.anyChanges = true;
    } else if (this.investorObj.id) {
      const tempId = this.loadedValue[(this.investor === this.investorType.person ? 'pid' : 'oid')];
      if (this.investorObj.id !== tempId)
        this.anyChanges = true;
    }
  }
}
