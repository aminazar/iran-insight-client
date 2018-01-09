import {Component, OnInit} from '@angular/core';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RestService} from '../../../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

@Component({
  selector: 'ii-investment-view',
  templateUrl: './investment-view.component.html',
  styleUrls: ['./investment-view.component.css']
})
export class InvestmentViewComponent implements OnInit {
  investmentId: number = null;
  id: number = null;
  type = null;
  isInvestor = false;
  investment: any = null;

  constructor(private progressService: ProgressService, private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService, private router: Router,
              private restService: RestService, public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.investmentId = +params['invid'] ? +params['invid'] : null;
        this.id = +params['id'] ? +params['id'] : null;
        this.type = params['type'] ? params['type'] : null;
        this.isInvestor = params['is_investor'] ? (params['is_investor'] === 'true' ? true : false) : false;
        if (this.investmentId) {
          this.breadcrumbService.pushChild('Investment Details', this.router.url, false);
          this.progressService.enable();

          this.restService.get('investment/' + this.investmentId).subscribe(
            (data) => {
              this.investment = data;
              this.progressService.disable();
            },
            (err) => {
              this.progressService.disable();
              console.error('Cannot get investment info. Error: ', err);
            }
          );
        }
      }
    );
  }

  editInvestment() {
    if (this.investment)
      this.router.navigate(['/admin/investment/form' +
      (this.type ? `/${this.type}` : '') + '/' + this.isInvestor + '/' + this.id + '/' + this.investmentId]);
  }

  deleteInvestment() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (dt) => {
        if (dt)
          this.restService.delete('investment/' +  this.investmentId).subscribe(
            (data) => this.breadcrumbService.popChild(),
            (err) => console.error('Cannot delete investment')
          );
      },
      (err) => console.error('An error occurred when subscribing on afterClosed dialog method: ', err)
    );
  }
}
