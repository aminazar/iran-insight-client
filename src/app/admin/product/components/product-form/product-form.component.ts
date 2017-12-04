import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';

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
  }

  get productId() {
    return this._productId;
  }

  productForm: FormGroup;
  _productId: number = null;
  anyChanges = false;
  originalProduct: any = null;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initForm();
    // this.initProduct();
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
      (data) => {
        this.snackBar.open('This product is added', null, {
          duration: 1800,
        });
      },
      (err) => {
        this.snackBar.open('Cannot add this product. Try again', null, {
          duration: 2300,
        });
      }
    );
  }

  nameRequiring(Ac: AbstractControl) {
    let name = Ac.get('name').value;
    let name_fa = Ac.get('name_fa').value;
    if ((!name || name === '') && (!name_fa || name_fa === ''))
      Ac.get('name').setErrors({beingNull: 'Both Name and name_fa can not be null.'});
    else {
      Ac.get('name').setErrors(null);
      return null;
    }
  }
}
