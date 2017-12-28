import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgressService} from '../../../../shared/services/progress.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActionEnum} from '../../../../shared/enum/action.enum';

@Component({
  selector: 'ii-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit {
  productId: number = null;
  businessId: number = null;
  product: any = null;
  upsertBtnShouldDisabled: boolean = false;
  deleteBtnShouldDisabled: boolean = false;
  actionEnum = ActionEnum;
  @Output() changedProduct = new EventEmitter();

  constructor(private authService: AuthService, private router: Router,public dialog: MatDialog,
              private progressService: ProgressService, private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.productId = +params['id'] ? +params['id'] : null;
        this.businessId = +params['bid'] ? +params['bid'] : null;
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

  // deleteProduct() {
  //   this.authService.deleteProduct(this.productId).subscribe(
  //     (data) => this.breadcrumbService.popChild(),
  //     (err) => console.error('Cannot delete this product')
  //   );
  // }

  deleteProduct() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '230px'
    });

    rmDialog.afterClosed().subscribe(
      (status) => {
        if (status) {

          this.progressService.enable();
          this.upsertBtnShouldDisabled = true;
          this.deleteBtnShouldDisabled = true;

          this.authService.deleteProduct(this.businessId, this.productId).subscribe(
            (data) => {
              this.snackBar.open('Product delete successfully', null, {
                duration: 2000,
              });

              this.changedProduct.emit({action: this.actionEnum.delete, value: this.productId});
              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;

              this.breadcrumbService.popChild();
            },
            (error) => {
              this.snackBar.open('Cannot delete this product. Please try again', null, {
                duration: 2700
              });
              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;
            }
          );
        }
      },
      (err) => {
        console.log('Error in dialog: ', err);
      }
    );
  }
}
