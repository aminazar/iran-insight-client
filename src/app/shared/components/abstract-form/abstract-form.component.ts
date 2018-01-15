import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CanComponentDeactivate} from '../../../admin/leavingGuard';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {RemovingConfirmComponent} from '../removing-confirm/removing-confirm.component';
import {LeavingConfirmComponent} from '../leaving-confirm/leaving-confirm.component';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../services/auth.service';
import {ProgressService} from '../../services/progress.service';
import {RestService} from '../../services/rest.service';
import {EndingEntityComponent} from '../ending-entity/ending-entity.component';

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

  form: FormGroup;
  _formId: number = null;
  originalForm: any = null;
  anyChanges = false;
  upsertBtnShouldDisabled = false;
  deleteBtnShouldDisabled = false;
  viewName: string;

  constructor(protected router: Router,
              protected restService: RestService,
              protected dialog: MatDialog,
              protected breadcrumbService: BreadcrumbService,
              protected route: ActivatedRoute,
              protected authService: AuthService,
              protected snackBar: MatSnackBar,
              protected progressService: ProgressService ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.formId = +params['formId'] ? +params['formId'] : null;
        this.breadcrumbService.pushChild((this.formId ? 'Update' : 'Add') + ' ' + this.viewName, this.router.url, false);
      }
    );
  }

  ngOnDestroy() {
    this.form = null;
  }

  initForm() {
    this.form.valueChanges.subscribe(
      (data) => {
        this.fieldChanged();
      },
      (err) => {
        console.error('Error: ', err);
      }
    );
  }

  fieldChanged() {

  }

  delete(name?): Observable<any> {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
      data: {
        name: name,
      }
    });

    return rmDialog.afterClosed();
  }

  end(name?): Observable<any> {
    const lcDialog = this.dialog.open(EndingEntityComponent, {
      width: '400px',
      data: {
        name: name,
      }
    });

    return lcDialog.afterClosed();
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
