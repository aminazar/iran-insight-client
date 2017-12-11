import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {ProgressService} from '../../../../shared/services/progress.service';
import {isUndefined} from 'util';


@Component({
  selector: 'ii-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input()
  set productId(id) {
    this._productId = id;
    this.initProduct();
    this.productForm = null;
    this.initForm();
  }

  get productId() {
    return this._productId;
  }

  @Output() changedProduct = new EventEmitter();

  productForm: FormGroup;
  _productId: number = null;
  anyChanges = false;
  originalProduct: any = null;
  actionEnum = ActionEnum;
  upsertBtnShouldDisabled: boolean = false;
  deleteBtnShouldDisabled: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private progressService: ProgressService) {
  }

  ngOnInit() {
    this.initForm();

    this.productForm.valueChanges.subscribe(
      (data) => {
        this.fieldChanged();
      },
      (err) => {
        console.log('Error: ', err);
      }
    );
  }

  ngOnDestroy() {
    this.productForm = null;
  }

  initForm() {
    this.productForm = new FormBuilder().group({
      name: [null],
      name_fa: [null],
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
    this.deleteBtnShouldDisabled = true;
    this.authService.getProductInfo(this.productId).subscribe(
      (data) => {
        data = data[0];
        this.originalProduct = data;

        this.productForm.controls['name'].setValue(data.name);
        this.productForm.controls['name_fa'].setValue(data.name_fa);
        this.productForm.controls['description'].setValue(data.description);
        this.productForm.controls['description_fa'].setValue(data.description_fa);


        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        console.log(err);
        this.snackBar.open('Cannot get product details. Please try again', null, {
          duration: 2500,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      }
    );
  }

  modifyProduct() {
    const data = {
      product_id: this.productId,
      name: this.productForm.controls['name'].value,
      name_fa: this.productForm.controls['name_fa'].value,
      description: this.productForm.controls['description'].value,
      description_fa: this.productForm.controls['description_fa'].value,
    };

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.authService.setProductInfo(data, this.productId).subscribe(
      (value) => {
        this.snackBar.open(this.productId ? 'Product is updated' : 'Product is added', null, {
          duration: 1800,
        });

        this.anyChanges = false;
        this.originalProduct = Object.assign({product_id: value.product_id}, data);
        this.changedProduct.emit({
          action: this.productId ? this.actionEnum.modify : this.actionEnum.add,
          value: Object.assign({product_id: value.product_id}, data)
        });

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        this.snackBar.open('Cannot add this product. Try again', null, {
          duration: 2300,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      }
    );
  }

  deleteProduct() {
    let rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '230px'
    });

    rmDialog.afterClosed().subscribe(
      (status) => {
        if (status) {

          this.progressService.enable();
          this.upsertBtnShouldDisabled = true;
          this.deleteBtnShouldDisabled = true;

          this.authService.deleteProduct(this.productId).subscribe(
            (data) => {
              this.snackBar.open('Product delete successfully', null, {
                duration: 2000,
              });

              this.changedProduct.emit({action: this.actionEnum.delete, value: this.productId});
              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;
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
    if(name === null || isUndefined(name) )
      name = '';
    if(name_fa === null || isUndefined(name_fa) )
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
    }
    else {
      Ac.get('name').setErrors(null);
      return null;
    }
  }
}

