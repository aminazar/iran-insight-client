import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProgressService} from "../../../../shared/services/progress.service";

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
              private progressService: ProgressService) {
  }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(
      (params) => {
        this.id = params['id'] ? +params['id'] : null;
        this.investmentId = params['invid'] ? +params['invid'] : null;

        if (this.investmentId)
          this.getInvestment();

        this.breadcrumbService.pushChild((this.id ? 'Update' : 'Add') + ' Investment', this.router.url, false);
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
    });
  }

  getInvestment() {
    this.initForm();
  }

  modifyInvestment() {
    if (!this.investorObj.id)
      return;

    let data = {};

    Object.keys(this.investmentForm.controls).forEach(el => {
      data[el] = this.investmentForm.controls[el].value;
    });

    this.progressService.enable();
    this.restService.put(
        (this.investor === this.investorType.person ? 'personalInvestment' : 'orgInvestment') +
        '/' + this.id +
        '/' + this.investorObj.id, data).subscribe(
      (rs) => {
        console.log(rs);
        this.loadedValue.id = rs;

        this.progressService.disable();
      },
      (err) => {
        this.progressService.disable();
      }
    );
  }

  deleteInvestment() {

  }

  setInvestor(data) {
    this.investorObj.id = this.investor === this.investorType.person ?
      data.pid :
      data.oid;
    this.investorObj.name = this.investor === this.investorType.person ?
      (data.display_name_en || data.display_name_fa) :
      (data.name || data.name_fa);
  }

  directToInvestor() {
    let url = '/admin/';

    if (this.investor === this.investorType.person)
      url += 'person';
    else if (this.investor === this.investorType.organization)
      url += 'organization';

    this.router.navigate([url + '/view/' + this.investorObj.id]);
  }
}
