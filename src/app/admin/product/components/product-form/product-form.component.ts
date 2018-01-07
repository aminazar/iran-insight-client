import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {ProgressService} from '../../../../shared/services/progress.service';
// import * as moment from 'moment';
import {isUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {LeavingConfirmComponent} from '../../../../shared/components/leaving-confirm/leaving-confirm.component';
import {CanComponentDeactivate} from '../../../leavingGuard';
import {RestService} from '../../../../shared/services/rest.service';

@Component({
  selector: 'ii-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @Input()
  set productId(id) {
    this._productId = id;
  }
  get productId() {
    return this._productId;
  }

  @Output() changedProduct = new EventEmitter();

  productForm: FormGroup;
  _productId: number = null;
  businessId: number = null;
  originalProduct: any = null;
  anyChanges = false;
  actionEnum = ActionEnum;
  upsertBtnShouldDisabled: boolean = false;
  deleteBtnShouldDisabled: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private progressService: ProgressService,
              private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
              private router: Router, private restService: RestService) { }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(
      (params) => {
        this.productId = +params['id'] ? +params['id'] : null;
        this.businessId = +params['bid'] ? +params['bid'] : null;
        this.initProduct();
        this.restService.get('/business/one/' + this.businessId).subscribe(
          (data) => {
           this.breadcrumbService.pushChild(this.productId ? 'Update' : 'Add' + ' Product' + ` to ${data.name}`, this.router.url, false);
          },
          (err) => {
            console.error(err);
          }
        );
        // this.breadcrumbService.pushChild(this.productId ? 'Update' : 'Add' + ' Product', this.router.url, false);
      }
    );
    this.productForm.valueChanges.subscribe(
      (data) => {
        this.fieldChanged();
      },
      (err) => {
        console.error('Error: ', err);
      }
    );
  }

  ngOnDestroy() {
    this.productForm = null;
  }

  initForm() {
    this.productForm = new FormBuilder().group({
      name: [null, [
        Validators.required,
      ]],
      name_fa:  [null, [
        Validators.required,
      ]],
      description: [null, [
        Validators.maxLength(500),
      ]],
      description_fa: [null, [
        Validators.maxLength(500),
      ]],
      parent_product_id: [null],
    }, {
      validator: this.nameRequiring,
    });
  }

  initProduct() {
    if (!this.productId) {
      this.productForm = null;
      this.initForm();
      return;
    }

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.authService.getProductInfo(this.productId).subscribe(
      (data) => {
        data = data[0];

        this.productForm.controls['name'].setValue(data.name);
        this.productForm.controls['name_fa'].setValue(data.name_fa);
        this.productForm.controls['description'].setValue(data.description);
        this.productForm.controls['description_fa'].setValue(data.description_fa);
        this.originalProduct = data;

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
      },
      (err) => {
        console.log(err);
        this.snackBar.open('Cannot get product details. Please try again', null, {
          duration: 2500,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = true;
      }
    );
  }

  modifyProduct() {
    const data = {
      business_id: this.businessId,
      product_id: this.productId,
      name: this.productForm.controls['name'].value,
      name_fa: this.productForm.controls['name_fa'].value,
      description: this.productForm.controls['description'].value,
      description_fa: this.productForm.controls['description_fa'].value,
    };

    if (!this.productId)
      delete data.product_id;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.authService.setProductInfo(data, this.businessId, this.productId).subscribe(
      (value) => {
        this.snackBar.open(this.productId ? 'Product is updated' : 'Product is added', null, {
          duration: 2300,
        });

        this.anyChanges = false;
        this.changedProduct.emit({
          action: this.productId ? this.actionEnum.modify : this.actionEnum.add,
          value: Object.assign({product_id: value.product_id}, data)
        });

        if (!this.productId) {
          this.productForm.reset();
        } else {
          this.originalProduct = Object.assign({product_id: data.product_id}, data);
          this.productId = data.product_id;
        }

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        this.snackBar.open('Cannot ' + this.productId ? 'add' : 'update' + 'this product. Try again', null, {
          duration: 3200,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      }
    );
  }

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

  fieldChanged() {
    if (!this.originalProduct)
      return;

    this.anyChanges = false;

    let name = (this.productForm.controls['name'].value === null || isUndefined(this.productForm.controls['name'].value)) ? '' : this.productForm.controls['name'].value;
    let name_fa = (this.productForm.controls['name_fa'].value === null || isUndefined(this.productForm.controls['name_fa'].value)) ? '' : this.productForm.controls['name_fa'].value;
    let description = (this.productForm.controls['description'].value === null || isUndefined(this.productForm.controls['description'].value)) ? '' : this.productForm.controls['description'].value;
    let description_fa = (this.productForm.controls['description_fa'].value === null || isUndefined(this.productForm.controls['description_fa'].value)) ? '' : this.productForm.controls['description_fa'].value;

    let origName = (this.originalProduct.name === null || isUndefined(this.originalProduct.name)) ? '' : this.originalProduct.name;
    let origName_fa = (this.originalProduct.name_fa === null || isUndefined(this.originalProduct.name_fa)) ? '' : this.originalProduct.name_fa;
    let origDescription = (this.originalProduct.description === null || isUndefined(this.originalProduct.description)) ? '' : this.originalProduct.description;
    let origDescription_fa = (this.originalProduct.description_fa === null || isUndefined(this.originalProduct.description_fa)) ? '' : this.originalProduct.description_fa;

    name = name.trim();
    name_fa = name_fa.trim();
    description = description.trim();
    description_fa = description_fa.trim();

    origName = origName.trim();
    origName_fa = origName_fa.trim();
    origDescription = origDescription.trim();
    origDescription_fa = origDescription_fa.trim();

    if (name !== origName && (name !== '' || origName !== null))
      this.anyChanges = true;
    if (name_fa !== origName_fa && (name_fa !== '' || origName_fa !== null))
      this.anyChanges = true;
    if (description !== origDescription && (description !== '' || origDescription !== null))
      this.anyChanges = true;
    if (description_fa !== origDescription_fa && (description_fa !== '' || origDescription_fa !== null))
      this.anyChanges = true;
  }

  nameRequiring(Ac: AbstractControl) {
    let name = Ac.get('name').value;
    let name_fa = Ac.get('name_fa').value;
    if (name === null || isUndefined(name))
      name = '';
    if (name_fa === null || isUndefined(name_fa))
      name_fa = '';
    name = name.trim();
    name_fa = name_fa.trim();
    if ((!name || name === '') || (!name_fa || name_fa === '')) {
      if (!name || name === '') {
        Ac.get('name').setErrors({beingNull: 'Name can not be null.'});
      }
      if (!name_fa || name_fa === '') {
        Ac.get('name_fa').setErrors({beingNull: 'name_fa can not be null.'});
      }
    } else {
      Ac.get('name').setErrors(null);
      return null;
    }
  }

  canDeactivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.anyChanges) {
        const lvDialog = this.dialog.open(LeavingConfirmComponent);

        lvDialog.afterClosed().subscribe(
          (data) => {
            if (data)
              resolve(true);
            else
              resolve(false);
          },
          (err) => reject(false)
        );
      }
      else
        resolve(true);
    });
  }

}
