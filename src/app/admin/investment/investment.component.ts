import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../shared/services/progress.service';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';

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
              private snackBar: MatSnackBar, private progressService: ProgressService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.investmentRelationName = params['name'] ? params['name'] : null;
        const type = params['type'] ? params['type'] : null;

        this.isPerson = this.router.url.toLowerCase().includes('person') ? true : false;
        this.isBiz = this.router.url.toLowerCase().includes('business') ? true : false;
        this.isOrg = this.router.url.toLowerCase().includes('organization') ? true : false;

        this.isInvestor = (this.isPerson || this.isOrg);
        this.getInvestments();
        if (!this.breadcrumbIsSet) {
          this.breadcrumbService.pushChild('Investments' +
            (this.isInvestor ? ' of ' : ' on ') +
            this.investmentRelationName, this.router.url, false);

          this.breadcrumbIsSet = true;
          this.id = params['id'] ? +params['id'] : null;
          this.getInvestments();
        }
      },
      (err) => {
        console.error('Cannot parse parameters from url: ', err);
      }
    );
  }

  open(type, id) {
    if (type === 'view')
      this.router.navigate(['/admin/investment/view/' +
      (this.isBiz ? '' : (this.isPerson ? 'person/' : 'organization/')) +
      this.isInvestor + '/' + this.id + '/' + id]);
    else if (type === 'form')
      this.router.navigate(['/admin/investment/form/' +
      (this.isBiz ? '' : (this.isPerson ? 'person/' : 'organization/')) +
      this.isInvestor + '/' + this.id + '/' + id]);
  }

  deleteInvestment(id) {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data)
          this.restService.delete('investment/' + id).subscribe(
            (rs) => {
              this.investmentList = this.investmentList.filter(el => el.id !== id);
              this.aligningItems();
              this.snackBar.open('The investment is deleted successfully', null, {
                duration: 2300,
              });
            },
            (err) => {
              console.error('Cannot delete investment: ', err);
            }
          );
      },
      (err) => {
        console.error('Error when closing dialog: ', err);
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
      url += 'all/' + this.id;

      this.progressService.enable();
      this.restService.get(url).subscribe(
        (data) => {
          this.investmentList = data;
          this.aligningItems();
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
