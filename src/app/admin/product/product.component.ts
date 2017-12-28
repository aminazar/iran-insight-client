import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActionEnum} from '../../shared/enum/action.enum';
import {ProgressService} from '../../shared/services/progress.service';

@Component({
  selector: 'ii-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  offset = 0;
  limit = 10;
  products = [];
  productId: number = null;
  showInDeep = false;
  searchData: any = null;
  actionEnum = ActionEnum;
  totalProducts: number = null;
  aligningObj = {};
  rows = [];

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, private snackBar: MatSnackBar,  private progressService: ProgressService) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('Product', this.router.url, true);
  }

  openForm(id: number): void {
    this.productId = id;
    this.showInDeep = true;
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
    this.productId = null;

    this.progressService.enable();
    this.searchService.search(this.searchData, this.offset, this.limit).subscribe(
      (data) => {
        this.products = data.product;
        this.totalProducts = this.products.length > 0 ? parseInt(this.products[0].total) : 0;

        let colCounter = 0;
        let rowCounter = 0;
        this.aligningObj = this.products.length > 0 ? {0: []} : {};
        this.products.forEach(el => {
          if (colCounter > 4) {
            this.aligningObj[++rowCounter] = [];
            colCounter = 0;
          }
          this.aligningObj[rowCounter].push(el);
          colCounter++;
      });

        this.rows = Object.keys(this.aligningObj);
        console.log(this.aligningObj);
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
    console.log('In applyChanges: ', data);

    switch (data.action) {
      case this.actionEnum.add: {
        this.products.unshift(data.value);
        this.products = this.products.slice(0, this.products.length - 1);
        console.log('ADD ==> ', this.aligningObj);
      }
        break;
      case this.actionEnum.modify: {
        this.products[this.products.findIndex(el => el.product_id === data.value.product_id)] = data.value;
        console.log('UPDATE ==> ', this.aligningObj);
      }
        break;
      case this.actionEnum.delete: {
        this.products = this.products.filter(el => el.product_id !== data.value);
        this.showInDeep = false;
        this.productId = null;
        console.log('DELETE ==> ', this.aligningObj);
        let keys = Object.keys(this.aligningObj);
        console.log('===>', keys);
        console.log('===>', this.aligningObj[keys[0]]);
        for (let i = 0; i < keys.length; i++) {
          let ind = this.aligningObj[i].findIndex(el => el.product_id === data.value);
          if (ind !== -1) {
            this.aligningObj[i].splice(ind, 1);
          }
          }
        }
        break;
    }}

  findingChangedElement(productId){
  }
}

