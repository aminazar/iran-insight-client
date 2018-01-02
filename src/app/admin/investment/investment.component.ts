import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../shared/services/rest.service';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from '../../shared/services/progress.service';

@Component({
  selector: 'ii-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  id = null;
  investmentRelationName = '';
  isInvestor = false;
  isPerson = false;
  isOrg = false;
  isBiz = false;
  aligningObj = {};
  rows = [];
  investmentList = [];
  breadcrumbIsSet = false;

  constructor(private breadcrumbService: BreadcrumbService, private router: Router,
              private route: ActivatedRoute, private restService: RestService,
              private snackBar: MatSnackBar, private progressService: ProgressService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (qp) => {
        this.investmentRelationName = qp['name'] ? qp['name'] : null;
        this.isPerson = qp['is_person'] ? qp['is_person'] : false;
        this.isBiz = qp['is_business'] ? qp['is_business'] : false;
        this.isOrg = qp['is_organization'] ? qp['is_organization'] : false;
        this.isInvestor = (this.isPerson || this.isOrg);
        this.getInvestments();
        if (!this.breadcrumbIsSet) {
          this.breadcrumbService.pushChild('Investments' +
            (this.isInvestor ? ' of ' : ' on ') +
            this.investmentRelationName, this.router.url, false);

          this.breadcrumbIsSet = true;
        }
      },
      (err) => {
        console.error('Cannot parse query parameters from url: ', err);
      }
    );
    this.route.params.subscribe(
      (params) => {
        this.id = params['id'] ? +params['id'] : null;
        this.getInvestments();
      },
      (err) => {
        console.error('Cannot parse parameters from url: ', err);
      }
    );
  }

  open(type, id) {
    if (type === 'view')
      this.router.navigate(['/admin/investment/view/' + this.id + '/' + id]);
    else if (type === 'form')
      this.router.navigate(['/admin/investment/form/' + this.id + '/' + id]);
  }

  deleteInvestment(id) {
    this.restService.delete('investment/' + id).subscribe(
      (data) => {
        this.snackBar.open('The investment is deleted successfully', null, {
          duration: 2300,
        });
      },
      (err) => {
        console.error('Cannot delete investment: ', err);
      }
    );
  }

  getInvestments() {
    if (this.id && (this.isPerson || this.isBiz || this.isOrg)) {
      let url = 'investment/';
      if (this.isPerson)
        url += 'person/';
      else if (this.isBiz)
        url += 'business/';
      else if (this.isOrg)
        url += 'organization/';
      url += this.id;

      this.progressService.enable();
      this.restService.get(url).subscribe(
        (data) => {
          this.investmentList = data;
          this.progressService.disable();
        },
        (err) => {
          this.progressService.disable();
        }
      );
    }
  }

  aligningItems() {
    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.investmentList.length > 0 ? {0: []} : {};
    this.investmentList.forEach(el => {
      if (colCounter > 3) {
        this.aligningObj[++rowCounter] = [];
        colCounter = 0;
      }

      this.aligningObj[rowCounter].push(el);
      colCounter++;
    });

    this.rows = Object.keys(this.aligningObj);
  }
}
