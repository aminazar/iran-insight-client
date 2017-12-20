import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgressService} from '../../../../shared/services/progress.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';

@Component({
  selector: 'ii-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  productId: number = null;
  product: any = null;

  constructor(private authService: AuthService, private router: Router,
              private progressService: ProgressService, private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.productId = +params['id'] ? +params['id'] : null;
        if (this.productId) {
          this.breadcrumbService.pushChild('Product Details', this.router.url, false);
          this.progressService.enable();

          this.authService.getProductInfo(this.productId).subscribe(
            (data) => {
              this.product = data[0];
              this.progressService.disable();
            },
            (err) => {
              this.progressService.disable();
              console.error('Cannot get product info. Error: ', err);
            }
          );
        }
      }
    );
  }

  editProduct() {
    this.router.navigate(['/admin/product/form/' + this.productId]);
  }

  deleteProduct() {
    this.authService.deleteProduct(this.productId).subscribe(
      (data) => this.breadcrumbService.popChild(),
      (err) => console.error('Cannot delete this product')
    );
  }

}
