import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'ii-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  offset = 0;
  products = [];
  productId: number = null;
  showInDeep = false;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('product', this.router.url, true);
  }

  openForm(id: number): void {
    console.log('In product open form function!!!');
    this.productId = id;
    this.showInDeep = true;
  }

  search(data) {
    console.log('In product search function!!!');
    this.searchService.search(data, this.offset).subscribe(
      (data) => {
        this.products = data.product;
      },
      (err) => {
        console.error('Cannot get data', err);
        this.snackBar.open('Cannot get data. Please check your connection', null, {
          duration: 3000,
        });
      }
    );
  }

  showDetails(product_id) {
    this.productId = product_id;
    this.showInDeep = true;
  }
}

