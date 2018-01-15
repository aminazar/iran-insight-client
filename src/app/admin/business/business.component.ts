import {Component, Inject, OnInit} from '@angular/core';
import {ActionEnum} from '../../shared/enum/action.enum';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import * as moment from 'moment';
import {SearchService} from '../../shared/services/search.service';
import {ProgressService} from '../../shared/services/progress.service';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';
import {RestService} from '../../shared/services/rest.service';
import {EndingEntityComponent} from '../../shared/components/ending-entity/ending-entity.component';

@Component({
  selector: 'ii-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  offset = 0;
  limit = 10;
  biz = [];
  bizId: number = null;
  showInDeep = false;
  searchData: any = null;
  actionEnum = ActionEnum;
  totalBiz: number = null;
  aligningObj = {};
  rows = [];

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private dialog: MatDialog,
              private restService: RestService, @Inject('Window') private window: Window) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('Business', this.router.url, true);
  }

  openForm(id: number = 0): void {
    this.router.navigate(['admin', 'business', 'upsert', id])
      .then(() => console.log('done routing'));
  }

  openView(bid: number = 0): void {
    this.router.navigate(['admin', 'business', 'view', bid]);
  }

  select(id: number = 0): void {
    if (this.bizId === id)
      this.bizId = null;
    else
      this.bizId = id;
  }

  search(data) {
    this.searchData = data;
    this.searching();
  }

  changeOffset(data) {
    this.limit = data.pageSize ? data.pageSize : 10;
    this.offset = data.pageIndex * this.limit;
    this.searching();
  }

  searching() {
    this.showInDeep = false;
    this.bizId = null;

    this.progressService.enable();
    this.searchService.search(this.searchData, this.offset, this.limit).subscribe(
      (data) => {
        this.biz = data.business;
        this.totalBiz = this.biz && this.biz.length > 0 ? +this.biz[0].total : 0;

        let colCounter = 0;
        let rowCounter = 0;
        this.aligningObj = this.biz && this.biz.length > 0 ? {0: []} : {};
        if (this.biz) {
          this.biz.forEach(el => {
            if (colCounter > 3) {
              this.aligningObj[++rowCounter] = [];
              colCounter = 0;
            }

            this.aligningObj[rowCounter].push(el);
            colCounter++;
          });
        }
        this.rows = Object.keys(this.aligningObj);
        this.progressService.disable();
      },
      (err) => {
        console.error('Cannot get data', err);
        this.snackBar.open('Cannot get data. Please check your connection', null, {
          duration: 3000,
        });
        this.progressService.disable();
      }
    );
  }

  applyChanges(data) {
    switch (data.action) {
      case this.actionEnum.add:
        this.biz.unshift(data.value);
        this.biz = this.biz.slice(0, this.biz.length - 1);
        break;
      case this.actionEnum.modify:
        this.biz[this.biz.findIndex(el => el.pid === data.value.pid)] = data.value;
        break;
      case this.actionEnum.delete:
        this.biz = this.biz.filter(el => el.pid !== data.value);
        this.showInDeep = false;
        this.biz = null;
        this.searching();
        break;
    }
    this.searching();
  }

  deleteBusiness(biz) {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
      data: {
        name: biz.name || biz.name_fa
      }
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.restService.delete('business/' + biz.bid).subscribe(
            () => {
              this.snackBar.open('Business is deleted successfully', null, {
                duration: 2000,
              });
              this.searching();
            },
            (error) => {
              this.snackBar.open('Cannot delete this Business.', null, {
                duration: 3200,
              });

              this.progressService.disable();
            }
          );
        }
      },
      (err) => {
        console.error('Error in dialog: ', err);
      }
    );
  }

  endBusiness(biz) {
    const lcDialog = this.dialog.open(EndingEntityComponent, {
      width: '400px',
      data: {
        name: biz.name || biz.name_fa,
      }
    });

    lcDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.restService.post('business/one/delete/' + biz.bid, {
            end_date: moment().format('YYYY-MM-DD'),
          }).subscribe(
            () => {
              this.snackBar.open('Business is ended successfully', null, {
                duration: 2000,
              });
              biz.end_date = moment().format('YYYY-MM-DD');
              this.progressService.disable();
            },
            (error) => {
              this.snackBar.open('Cannot ending this Business.', null, {
                duration: 3200,
              });

              this.progressService.disable();
            }
          );
        }
      },
      (err) => {
        console.error('Error in dialog: ', err);
      }
    );
  }

  bizIsEnd(biz) {
    return (biz && biz.end_date && biz.end_date >= biz.start_date);
  }
}
