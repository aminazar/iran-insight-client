import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';


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

  constructor(private authService: AuthService, private snackBar: MatSnackBar, public dialog: MatDialog) {
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

    this.authService.getProductInfo(this.productId).subscribe(
      (data) => {
        data = data[0];
        this.originalProduct = data;

        this.productForm.controls['name'].setValue(data.name);
        this.productForm.controls['name_fa'].setValue(data.name_fa);
        this.productForm.controls['description'].setValue(data.description);
        this.productForm.controls['description_fa'].setValue(data.description_fa);
      },
      (err) => {
        console.log(err);
        this.snackBar.open('Cannot get product details. Please try again', null, {
          duration: 2500,
        });
      }
    );
  }

  modifyProduct() {
    const data = {
      name: this.productForm.controls['name'].value,
      name_fa: this.productForm.controls['name_fa'].value,
      description: this.productForm.controls['description'].value,
      description_fa: this.productForm.controls['description_fa'].value,
    };

    this.authService.setProductInfo(data).subscribe(
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
      },
      (err) => {
        this.snackBar.open('Cannot add this product. Try again', null, {
          duration: 2300,
        });
      }
    );
  }

  fieldChanged() {
    if (!this.originalProduct)
      return;

    this.anyChanges = false;

    if (this.productForm.controls['name'].value !== this.originalProduct.name && (this.productForm.controls['name'].value !== '' || this.originalProduct.name !== null))
      this.anyChanges = true;
    if (this.productForm.controls['name_fa'].value !== this.originalProduct.name_fa && (this.productForm.controls['name_fa'].value !== '' || this.originalProduct.name_fa !== null))
      this.anyChanges = true;
    if (this.productForm.controls['description'].value !== this.originalProduct.description && (this.productForm.controls['description'].value !== '' || this.originalProduct.description !== null))
      this.anyChanges = true;
    if (this.productForm.controls['description_fa'].value !== this.originalProduct.description_fa && (this.productForm.controls['description_fa'].value !== '' || this.originalProduct.description_fa !== null))
      this.anyChanges = true;
  }

  deleteProduct() {
    let rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '230px'
    });

    rmDialog.afterClosed().subscribe(
      (status) => {
        if (status) {
          this.authService.deleteProduct(this.productId).subscribe(
            (data) => {
              this.snackBar.open('Product delete successfully', null, {
                duration: 2000,
              });

              this.changedProduct.emit({action: this.actionEnum.delete, value: this.productId});
            },
            (error) => {
              this.snackBar.open('Cannot delete this product. Please try again', null, {
                duration: 2700
              });
            }
          );
        }
      },
      (err) => {
        console.log('Error in dialog: ', err);
      }
    );
  }

  nameRequiring(Ac: AbstractControl) {
    const name = Ac.get('name').value;
    const name_fa = Ac.get('name_fa').value;
    if ((!name || name === '') && (!name_fa || name_fa === ''))
      Ac.get('name').setErrors({beingNull: 'Both Name and name_fa can not be null.'});
    else {
      Ac.get('name').setErrors(null);
      return null;
    }
  }
}