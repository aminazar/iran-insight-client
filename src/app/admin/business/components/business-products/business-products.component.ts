import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {RestService} from '../../../../shared/services/rest.service';
import {IProduct} from '../../interfaces/IProduct';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'ii-business-products',
  templateUrl: './business-products.component.html',
  styleUrls: ['./business-products.component.css']
})
export class BusinessProductsComponent implements OnInit, OnDestroy {
  businessId: number;
  productId: number = null;
  add = false;
  bizProductList: IProduct[] = [];
  currentProductIds: number[] = [];
  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute, public dialog: MatDialog,
              private restService: RestService, private authService: AuthService) {
  }

  ngOnInit() {
    let bizName = null;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.businessId = +params['bid'];
      this.add = !this.businessId;
      if (!this.add)
        this.getBizProduct();
    });

    this.restService.get('/business/one/' + this.businessId).subscribe(
      (data) => {
        bizName = data.name;
        this.breadCrumbService.pushChild(`${bizName} Products`, this.router.url, false);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnDestroy() {
  }

  openForm(id: number = null): void {
    // Navigate to new page (3 tabs: Information, Expertise and Partnership)
    this.productId = id;
    this.router.navigate([`/admin/product/form/${id}/${this.businessId}`]);
  }

  getBizProduct() {
    if (!this.businessId)
      return;

    this.restService.get('/business/product/all/' + this.businessId).subscribe(
      (data) => {
        let counter = 0;
        this.bizProductList = [];
        data.forEach(el => {
          this.bizProductList.push({
            position: ++counter,
            name: el.name,
            name_fa: el.name_fa,
            description: el.description,
            description_fa: el.description,
            product_id: el.product_id,
          });
        });

        this.currentProductIds = this.bizProductList.map(el => el.product_id);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  addBizProduct(proObj) {
    this.restService.get('/product/one/' + proObj.product_id).subscribe(
      (proData) => {
        this.restService.put('/business/product', {
          business_id: this.businessId,
          product_id: proObj.product_id,
        }).subscribe(
          (data) => {
            this.bizProductList.push({
              position: this.bizProductList.length + 1,
              name: proData[0].name,
              name_fa: proData[0].name_fa,
              description: proData[0].description,
              description_fa: proData[0].description,
              product_id: proData[0].product_id,
            });

            this.currentProductIds.push(proData[0].product_id);

            this.snackBar.open('Product was added to this business', null, {
              duration: 2300,
            });
          },
          (err) => {
            console.error('Cannot add product: ', err);
            this.snackBar.open('Cannot add this product. Please try again', null, {
              duration: 3000,
            });
          }
        );
      },
      (err) => {
        console.log('Cannot get business details. Error: ', err);
      }
    );
  }

  removeBizProduct(proObj) {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '230px'
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.restService.delete( `/business/product/${this.businessId}/${proObj.product_id}`).subscribe(
            (data) => {
              this.snackBar.open('business product delete successfully', null, {
                duration: 2000,
              });

              const item = this.bizProductList.find(el => el.product_id === proObj.product_id);
              this.bizProductList = this.bizProductList.filter(el => el.product_id !== proObj.product_id);
              this.currentProductIds = this.currentProductIds.filter(el => el !== proObj.product_id);
            },
            (error) => {
              this.snackBar.open('Cannot delete this business product. Please try again', null, {
                duration: 2700
              });
            }
          );
        }
      },
      (err) => {
        console.error('Error in dialog: ', err);
      }
    );
  }

  editProduct(proObj) {
    this.productId = proObj.product_id;
    this.router.navigate([`/admin/product/form/${this.productId}/${this.businessId}`]);
  }
}
