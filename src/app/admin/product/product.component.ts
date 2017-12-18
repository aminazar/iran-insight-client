import {Component, Input, OnInit, Output} from '@angular/core';
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
  selectedIndex = 0;
  showReadOnlyCard = false;

  @Output() deleting = false;
  @Output() updating = false;
  @Output() viewInfo = false;
  @Output() adding = false;
  @Input() testData;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, private snackBar: MatSnackBar,  private progressService: ProgressService) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('Product', this.router.url, true);
  }


  openForm(id: number = null): void {
    this.deleting = false;
    this.updating = false;
    this.viewInfo = false;
    this.adding = true;
    this.showInDeep = true;
    this.selectedIndex = 0;
    this.productId = id;
    this.showReadOnlyCard = false;
  }

  openViewForm(id: number = null): void {
    this.deleting = false;
    this.updating = false;
    this.viewInfo = true;
    this.adding = false;
    this.showReadOnlyCard = true;
    this.showInDeep = true;
    this.selectedIndex = 0;
    this.productId = id;
  }

  openUpdateForm (id: number = null): void {
    this.deleting = false;
    this.updating = true;
    this.viewInfo = false;
    this.adding = false;
    this.productId = id;
    this.showInDeep = true;
    this.selectedIndex = 0;
    this.showReadOnlyCard = false;
    this.router.navigate(['admin', 'product', 'upsert', this.productId])
      .then(() => console.log('done routing'));
  }

  openDeleteForm(id: number = null): void {
    this.deleting = true;
    this.updating = false;
    this.viewInfo = false;
    this.adding = false;
    this.productId = id;
    this.showInDeep = true;
    this.selectedIndex = 0;
    this.showReadOnlyCard = false;
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
    this.showReadOnlyCard = false;
    this.productId = null;

    this.progressService.enable();
    this.searchService.search(this.searchData, this.offset, this.limit).subscribe(
      (data) => {
        this.products = data.product;
        this.totalProducts = this.products && this.products.length > 0 ? parseInt(this.products[0].total) : 0;
        this.aligningItems();
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

  aligningItems() {
    if(this.totalProducts <= 0){
      this.aligningObj = {};
      this.rows = [];
      return;
    }
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
  }

  applyChanges(data) {
    switch (data.action) {
      case this.actionEnum.add: {
        if (this.limit > this.products.length && this.checkWithSearch(data.value)) {
          this.products.push(data.value);
          this.aligningItems();
        }
        this.totalProducts++;
      }
        break;
      case this.actionEnum.modify: {
        if (this.checkWithSearch(data.value)) {
          this.products[this.products.findIndex(el => el.product_id === data.value.product_id)] = data.value;
          this.aligningItems();
        } else
          this.searching();
      }
        break;
      case this.actionEnum.delete: {
        this.showInDeep = false;
        this.productId = null;
        this.searching();
      }
        break;
    }
  }

  checkWithSearch(data) {
    if (!this.searchData.phrase || this.searchData.phrase.trim() === '')
      return true;

    let isMatched = false;

    ['name', 'name_fa', 'description', 'description_fa'].forEach(el => {
      if (new RegExp(this.searchData.phrase.toLowerCase()).test(data[el] ? data[el].toLowerCase() : null))
        isMatched = true;
    });

    return isMatched;
  }
}

