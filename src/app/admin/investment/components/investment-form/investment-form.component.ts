import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ii-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent implements OnInit {
  id = null;
  investmentForm: FormGroup;
  loadedValue: any = {};
  currencyList = [
    {abbr: 'Afghani', value: 'AFN'},
    {abbr: 'Euro', value: 'EUR'},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
    {abbr: '', value: ''},
  ];
  customCurrency;

  constructor(private restService: RestService, private breadcrumbService: BreadcrumbService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id = params['id'] ? +params['id'] : null;
        if (this.id)
          this.getInvestment();
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
      ]],
      currency: [this.loadedValue.currency, [
        Validators.required,
      ]],
      is_lead: [this.loadedValue.is_lead ? this.loadedValue.is_lead : false, [
        Validators.required
      ]],
    });
  }

  modifyInvestment() {

  }

  getInvestment() {

  }
}
