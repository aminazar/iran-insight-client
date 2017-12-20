import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {ProgressService} from '../../../../shared/services/progress.service';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {LeavingConfirmComponent} from '../../../../shared/components/leaving-confirm/leaving-confirm.component';

@Component({
  selector: 'ii-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input()
  set productId(id) {
    this._productId = id;
  }
  get productId() {
    return this._productId;
  }
  productForm: FormGroup;
  _productId: number = null;
  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private progressService: ProgressService,
              private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.productId = +params['id'] ? +params['id'] : null;
        this.breadcrumbService.pushChild(this.productId ? 'Update' : 'Add' + ' Product', this.router.url, false);
      }
    );
  }

  ngOnDestroy() {
    this.productForm = null;
  }

}
