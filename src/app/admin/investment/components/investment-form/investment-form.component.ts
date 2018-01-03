import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProgressService} from '../../../../shared/services/progress.service';
import {AuthService} from '../../../../shared/services/auth.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

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
  currencyList = [
    {name: 'Afghani', value: 'AFN'},
    {name: 'European euro', value: 'EUR'},
    {name: 'United States dollar', value: 'USD'},
    {name: 'East Caribbean dollar', value: 'XCD'},
    {name: 'Argentine peso', value: 'ARS'},
    {name: 'Armenian dram', value: 'AMD'},
    {name: 'Australian dollar', value: 'AUD'},
    {name: 'Bahamian dollar', value: 'BSD'},
    {name: 'Bahraini dinar', value: 'BHD'},
    {name: 'Brazilian real', value: 'BRL'},
    {name: 'Bulgarian lev', value: 'BGN'},
    {name: 'West African CFA franc', value: 'XOF'},
    {name: 'Canadian dollar', value: 'CAD'},
    {name: 'Central African CFA franc', value: 'XAF'},
    {name: 'New Zealand dollar', value: 'NZD'},
    {name: 'Chinese Yuan Renminbi', value: 'CNY'},
    {name: 'Egyptian pound', value: 'EGP'},
    {name: 'Falkland Islands pound', value: 'FKP'},
    {name: 'East Caribbean dollar', value: 'XCD'},
    {name: 'Hong Kong dollar', value: 'HKD'},
    {name: 'Indian rupee', value: 'INR'},
    {name: 'Iranian rial', value: 'IRR'},
    {name: 'Iraqi dinar', value: 'IQD'},
    {name: 'Israeli new shekel', value: 'ILS'},
    {name: 'Japanese yen', value: 'JPY'},
    {name: 'Kazakhstani tenge', value: 'KZT'},
    {name: 'Liberian dollar', value: 'LRD'},
    {name: 'Malawian kwacha', value: 'MWK'},
    {name: 'Mexican peso', value: 'MXN'},
    {name: 'Nepalese rupee', value: 'NPR'},
    {name: 'Nicaraguan cordoba', value: 'NIO'},
    {name: 'Omani rial', value: 'OMR'},
    {name: 'Pakistani rupee', value: 'PKR'},
    {name: 'Philippine peso', value: 'PHP'},
    {name: 'Qatari riyal', value: 'QAR'},
    {name: 'Romanian leu', value: 'RON'},
    {name: 'Russian ruble', value: 'RUB'},
    {name: 'Rwandan franc', value: 'RWF'},
    {name: 'Saint Helena pound', value: 'SHP'},
    {name: 'Saudi Arabian riyal', value: 'SAR'},
    {name: 'Singapore dollar', value: 'SGD'},
    {name: 'South African rand', value: 'ZAR'},
    {name: 'South Korean won', value: 'KRW'},
    {name: 'Sudanese pound', value: 'SDG'},
    {name: 'Swedish krona', value: 'SEK'},
    {name: 'Turkish lira', value: 'TRY'},
    {name: 'Turkmen manat', value: 'TMT'},
    {name: 'Ukrainian hryvnia', value: 'UAH'},
    {name: 'Pound sterling', value: 'GBP'},
    {name: 'Venezuelan bolivar', value: 'VEF'},
    {name: 'Vietnamese dong', value: 'VND'},
    {name: 'Yemeni rial', value: 'YER'},
  ];

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
    });
  }

  getInvestment() {
    if (!this.investmentId)
      return;

    this.restService.get('investment/' + this.investmentId).subscribe(
      (data) => {
        this.loadedValue = data;
        if (data.pid) {
          this.investorObj.id = data.pid;
          this.investorObj.name = data.person_display_name || data.perosn_display_name_fa;
        } else if (data.oid) {
          this.investorObj.id = data.oid;
          this.investorObj.name = data.name || data.name_fa;
        }

        this.initForm();
      },
      (err) => {
        console.error('Cannot get investment details');
      }
    );
  }

  modifyInvestment() {
    if (!this.investorObj.id && !this.investmentObj.id)
      return;

    let data: any = {};

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
      url = (this.isPerson ? 'personalInvestment' : 'orgInvestment') + '/' + this.investmentObj.id + '/' + this.id;
    } else {
      url = (this.investor === this.investorType.person ? 'personalInvestment' : 'orgInvestment') +
        '/' + this.id +
        '/' + this.investorObj.id;
    }

    this.restService.put(url, data)
      .subscribe(
        (rs) => {
          this.loadedValue.id = rs;

          if (!this.investmentId) {
            this.initForm();
            this.investorObj = {
              id: null,
              name: null,
            };
          }

          this.snackBar.open('The investment is added successfully', null, {
            duration: 2300,
          });
          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;
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
  }

  setTargetBusiness(data) {
    this.investmentObj.id = data.bid;
    this.investmentObj.name = data.name || data.name_fa;
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
}
