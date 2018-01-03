import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {ActionEnum} from '../../shared/enum/action.enum';
import {ProgressService} from '../../shared/services/progress.service';
import {AuthService} from '../../shared/services/auth.service';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';


@Component({
  selector: 'ii-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  offset = 0;
  limit = 10;
  showInDeep = false;
  productId: number = null;
  searchData: any = null;
  totalProducts: number = null;
  products = [];
  rows = [];
  aligningObj = {};
  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, private snackBar: MatSnackBar,
              private progressService: ProgressService, public dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
    this.breadCrumbService.pushChild('Product', this.router.url, true);
  }

  openForm(id: number = null): void {
    // Navigate to new page (3 tabs: Information, Expertise and Partnership)
    this.productId = id;
    this.router.navigate(['/admin/product/form/' + id]);
  }

  openView(id: number = null): void {
    this.productId = id;
    this.router.navigate(['/admin/product/' + id]);
  }

  deleteProduct(bid, id: number = null): void {
    // console.log('***');
    // this.productId = id;
    // const rmDialog = this.dialog.open(RemovingConfirmComponent, {
    //   width: '330px',
    //   height: '230px'
    // });
    // rmDialog.afterClosed().subscribe(
    //   (res) => {
    //     if (res) {
    //       this.authService.deleteProduct(id).subscribe(
    //         (data) => {
    //           this.productId = null;
    //           this.snackBar.open('Product delete successfully', null, {
    //             duration: 2300,
    //           });
    //           this.searching();
    //         },
    //         (err) => {
    //           console.error('Cannot delete this product. Error: ', err);
    //           this.snackBar.open('Cannot delete this product. Please try again', null, {
    //             duration: 2300
    //           });
    //         }
    //       );
    //     }
    //   },
    //   (err) => console.log('Error in closing component. Error: ', err)
    // );
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
    if (this.totalProducts <= 0) {
      this.aligningObj = {};
      this.rows = [];
      return;
    }

    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.products.length > 0 ? {0: []} : {};
    this.products.forEach(el => {
      if (colCounter > 3) {
        this.aligningObj[++rowCounter] = [];
        colCounter = 0;
      }

      this.aligningObj[rowCounter].push(el);
      colCounter++;
    });

    this.rows = Object.keys(this.aligningObj);
  }

  select(id: number = null) {
    if (this.productId === id)
      this.productId  = null;
    else
      this.productId  = id;
    this.router.navigate(['/admin/product/' + id]);
  }

  findingChangedElement(productId) {
  }
}

