import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CanComponentDeactivate} from '../../../admin/leavingGuard';
import { FormGroup} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {RemovingConfirmComponent} from '../removing-confirm/removing-confirm.component';
import {LeavingConfirmComponent} from '../leaving-confirm/leaving-confirm.component';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../services/auth.service';
import {ProgressService} from '../../services/progress.service';

@Component({
  selector: 'ii-abstract-form',
  template: ``,
  styles: []
})
export class AbstractFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  @Input()
  set formId(id) {
    this._formId = id;
  }

  get formId() {
    return this._formId;
  }

  @Output() changedForm = new EventEmitter();

  form: FormGroup;
  _formId: number = null;
  originalForm: any = null;
  anyChanges = false;
  upsertBtnShouldDisabled = false;
  deleteBtnShouldDisabled = false;
  viewName: string;

  constructor(private router: Router,
              protected dialog: MatDialog,
              protected breadcrumbService: BreadcrumbService,
              protected route: ActivatedRoute,
              protected authService: AuthService,
              protected snackBar: MatSnackBar,
              protected progressService: ProgressService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.formId = +params['id'] ? +params['id'] : null;
        this.breadcrumbService.pushChild((this.formId ? 'Update' : 'Add') + ' ' + this.viewName, this.router.url, false);
      }
    );
  }

  ngOnDestroy() {
    this.form = null;
  }

  fieldChanged() {
    if (!this.originalForm)
      return;

    this.anyChanges = false;

    // change logic must be implemented in children class
  }

  delete(): Observable<any> {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '250px'
    });

    return rmDialog.afterClosed();
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
      } else
        resolve(true);
    });
  }

}
