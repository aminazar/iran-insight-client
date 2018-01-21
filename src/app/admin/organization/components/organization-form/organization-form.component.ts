import {Component, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {AbstractFormComponent} from '../../../../shared/components/abstract-form/abstract-form.component';
import * as moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormBuilder, Validators} from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'ii-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class OrganizationFormComponent extends AbstractFormComponent implements OnInit {
  ceo: any = {
    id: null,
    name: null,
  };
  orgType: any = {
    id: null,
    name: null,
  };

  ngOnInit() {
    this.viewName = 'Organization';
    super.ngOnInit();
    this.initForm();
    this.route.params.subscribe(
      (params) => this.initOrg()
    );
  }

  initForm() {
    this.form = new FormBuilder().group({
      name: [null, [
        Validators.required,
      ]],
      name_fa: [null],
      start_date: [null],
      end_date: [null],
    });

    super.initForm();
  }

  initOrg() {
    if (!this.formId)
      return;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.restService.get('organization/' + this.formId).subscribe(
      (data) => {
        data = data[0];

        this.form.controls['name'].setValue(data.org_name);
        this.form.controls['name_fa'].setValue(data.org_name_fa);
        this.form.controls['start_date'].setValue(data.org_start_date);
        this.form.controls['end_date'].setValue(data.org_end_date);
        this.ceo.id = data.ceo_id;
        this.ceo.name = data.ceo_name || data.ceo_name_fa;
        this.orgType.id = data.org_type_id;
        this.orgType.name = data.org_type || data.org_type_fa;

        this.originalForm = {};

        this.originalForm.name = data.org_name;
        this.originalForm.name_fa = data.org_name_fa;
        this.originalForm.start_date = data.org_start_date;
        this.originalForm.end_date = data.org_end_date;

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        console.error(err);
        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      }
    );
  }

  modifyOrg() {
    const orgData = {
      oid: this.formId,
      name: this.form.controls['name'].value,
      name_fa: this.form.controls['name_fa'].value,
      start_date: this.form.controls['start_date'].value ? moment(this.form.controls['start_date'].value).format('YYYY-MM-DD') : null,
      end_date: this.form.controls['end_date'].value ? moment(this.form.controls['end_date'].value).format('YYYY-MM-DD') : null,
      ceo_pid: this.ceo.id ? this.ceo.id : null,
      org_type_id: this.orgType.id ? this.orgType.id : null,
    };

    if (!this.formId)
      delete orgData.oid;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.restService.post('organization/profile', orgData).subscribe(
      (data) => {
        this.snackBar.open('Organization is ' + (this.formId ? 'updated' : 'added'), null, {
          duration: 2300,
        });

        this.anyChanges = false;

        if (!this.formId)
          this.form.reset();
        else {
          this.originalForm = Object.assign({pid: data.pid}, orgData);
          this.formId = data;
        }

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      }
    );
  }

  fieldChanged() {
    if (!this.originalForm)
      return;

    this.anyChanges = false;

    Object.keys(this.form.controls).forEach(el => {
      let formValue = this.form.controls[el].value;
      let originalValue = this.originalForm[el];

      if (el === 'start_date' || el === 'end_date') {
        if ((moment(formValue).format('YYYY-MM-DD') !== moment(originalValue).format('YYYY-MM-DD'))
          && (formValue !== '' || originalValue !== null))
          this.anyChanges = true;
      } else {
        if (formValue && formValue.trim().length <= 0)
          formValue = null;
        else if (formValue)
          formValue = formValue.trim();

        if (originalValue && originalValue.trim().length <= 0)
          originalValue = null;
        else if (originalValue)
          originalValue = originalValue.trim();

        if (formValue !== originalValue && (formValue !== '' || originalValue !== null))
          this.anyChanges = true;
      }
    });
  }

  endOrg() {
    super.end(this.originalForm.name || this.originalForm.name_fa).subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.upsertBtnShouldDisabled = true;
          this.deleteBtnShouldDisabled = true;

          this.restService.post('organization/one/delete/' + this.formId, {
            end_date: this.form.controls['end_date'].value ? this.form.controls['end_date'].value : moment().format('YYYY-MM-DD'),
          }).subscribe(
            (dt) => {
              this.snackBar.open('Organization is ended successfully', null, {
                duration: 2300,
              });

              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;
            },
            (error) => {
              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;
            }
          );
        }
      }
    );
  }

  deleteOrg() {
    super.delete(this.originalForm.name || this.originalForm.name_fa).subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.upsertBtnShouldDisabled = true;
          this.deleteBtnShouldDisabled = true;

          this.restService.delete('organization/' + this.formId).subscribe(
            (dt) => {
              this.snackBar.open('Organization is deleted successfully', null, {
                duration: 2300,
              });

              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;

              this.breadcrumbService.popChild();
            },
            (error) => {
              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;
            }
          );
        }
      },
      (err) => {
        console.error('Error in dialog: ', err);
      }
    );
  }

  setType(data) {
    this.orgType.id = data.id;
    this.orgType.name = data.name || data.name_fa;
  }

  setCEO(data) {
    this.ceo.id = data.pid;
    this.ceo.name = data.display_name_en || data.display_name_fa;
  }

  directToCEO() {
    this.router.navigate(['admin/person/view/' + this.ceo.id]);
  }

  directToType() {
    this.router.navigate(['admin/type/view/' + this.orgType.id]);
  }

  orgIsEnd() {
    return (this.formId &&
    this.originalForm &&
    this.originalForm.end_date &&
    this.originalForm.end_date >= this.originalForm.start_date &&
    moment(this.originalForm.end_date) <= moment());
  }
}
