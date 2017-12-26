import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import {Params} from '@angular/router';
import {AbstractFormComponent} from '../../../../shared/components/abstract-form/abstract-form.component';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

enum LCEType {
  ORG = 'organization',
  BIZ = 'business'
}


@Component({
  selector: 'ii-lce-form',
  templateUrl: './lce-form.component.html',
  styleUrls: ['./lce-form.component.css']
})
export class LceFormComponent extends AbstractFormComponent implements OnInit {

  companyType: string; // company is org or biz
  companyId: number;
  companyName: string;
  companyKey: string;

  possessorId: number;
  possessorName: number;
  possessorNameFa: number;

  joinerId: number;
  joinerName: string;
  joinerNameFa: string;

  lceTypeId: number;
  lceTypeName: string;
  lceTypeNameFa: string;

  ngOnInit() {

    this.viewName = 'Life Cycle Event';
    super.ngOnInit();
    this.initForm();

    this.route.params.subscribe((params: Params) => {

      this.companyType = this.router.url.split('/')[2];

      this.companyId = params['id'];
      this.companyName = decodeURIComponent(params['companyName']);
      this.initLCE();

    });

    this.companyKey = this.companyType === LCEType.BIZ ? 'bid' : 'oid';

  }

  initForm() {
    this.form = new FormBuilder().group({
      start_date: [new Date(), [
        Validators.required,
      ]],
      end_date: [null],
      description: [null],
      description_fa: [null],
      is_confirmed: [false]
    }, {
      validator: this.dateChecker
    });

    super.initForm();
  }

  initLCE() {

    if (!this.formId) {
      this.possessorId = this.companyId;
      return;
    }
    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    this.restService.get(`lce/${this.companyType}/${this.companyId}/${this.formId}`).subscribe(
      (res) => {

        this.originalForm = res[0];

        this.lceTypeId = res[0].lce_type_id;
        this.lceTypeName = res[0].lce_type_name;
        this.lceTypeNameFa = res[0].lce_type_name_fa;
        this.possessorId = res[0].possessor_id;
        this.possessorName = res[0].possessor_name;
        this.possessorNameFa = res[0].possessor_name_fa;
        this.joinerId = res[0].joiner_id;
        this.joinerName = res[0].joiner_name;
        this.joinerNameFa = res[0].joiner_name_fa;
        this.form.controls['start_date'].setValue(res[0].start_date);
        this.form.controls['end_date'].setValue(res[0].end_date);
        this.form.controls['description'].setValue(res[0].description);
        this.form.controls['description_fa'].setValue(res[0].description_fa);
        this.form.controls['is_confirmed'].setValue(res[0].is_confirmed);

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        console.error(err);
        this.snackBar.open('Cannot get user details. Please try again', null, {
          duration: 3200,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = true;
        this.deleteBtnShouldDisabled = true;
      }
    );
  }

  changeLCEType(event) {

    this.lceTypeId = event.id;
    this.lceTypeName = event.name;
    this.lceTypeNameFa = event.name_fa;
    this.fieldChanged();

  }

  changeJoiner(event) {

    this.joinerId = event.bid;
    this.joinerName = event.name;
    this.joinerNameFa = event.name_fa;
    this.fieldChanged();
  }

  removeJoiner() {
    this.joinerId = null;
    this.joinerName = null;
    this.joinerNameFa = null;
    this.fieldChanged();

  }

  removeLCEType() {
    this.lceTypeId = null;
    this.lceTypeName = null;
    this.lceTypeNameFa = null;
    this.fieldChanged();

  }

  getCurrentJoinerIds(): number[] {
    const currentIds: number[] = [];

    if (this.possessorId)
      currentIds.push(this.possessorId);
    if (this.joinerId)
      currentIds.push(this.joinerId);

    return currentIds;
  }

  getCurrentTypeId(): number[] {
    const currentIds: number[] = [];

    if (this.lceTypeId)
      currentIds.push(this.lceTypeId);
    return currentIds;
  }


  modifyLCE() {

    const lceData = {
      id: this.formId,
      id1: this.possessorId,
      id2: this.joinerId,
      start_date: this.form.controls['start_date'].value,
      end_date: this.form.controls['end_date'].value,
      description: this.form.controls['description'].value,
      description_fa: this.form.controls['description_fa'].value,
      is_confirmed: this.form.controls['is_confirmed'].value,
      lce_type_id: this.lceTypeId
    };

    if (!this.formId)
      delete lceData.id;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.restService.put(`lce/${this.companyType}`, lceData).subscribe(
      (data) => {
        this.snackBar.open(this.formId ? 'Life cycle event is updated' : 'Life cycle event is added', null, {
          duration: 2300,
        });

        this.anyChanges = false;

        if (!this.formId) {
          this.form.reset();
          this.removeJoiner();
          this.removeLCEType();
        } else {
          this.formId = data[0].id;
        }

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        this.snackBar.open('Cannot ' + this.formId ? 'add' : 'update' + ' this life cycle event. Try again', null, {
          duration: 3200,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      }
    );
  }

  dateChecker(AC: AbstractControl) {
    const sd = AC.get('start_date').value;
    const ed = AC.get('end_date').value;

    if (sd === null || sd === '')
      AC.get('start_date').setErrors({notNull: 'Start date cannot be null'});
    if (moment(sd).isAfter(ed))
      AC.get('start_date').setErrors({compare: 'Start date must be before end date'});
    else
      return null;
  }

  fieldChanged() {
    if (!this.originalForm || !this.lceTypeId)
      return;

    this.anyChanges = false;

    if (this.lceTypeId !== this.originalForm.lce_type_id) {
      this.anyChanges = true;
      return;
    }
    if (this.joinerId !== this.originalForm.joiner_id) {
      this.anyChanges = true;
      return;
    }
    Object.keys(this.form.controls).forEach(el => {
        let formValue = this.form.controls[el].value;
        let originalValue = this.originalForm[el];

        if (el === 'start_date' || el === 'end_date') {
          if ((moment(formValue).format('YYYY-MM-DD') !== moment(originalValue).format('YYYY-MM-DD'))
            && (formValue !== '' || originalValue !== null))
            this.anyChanges = true;
        } else {
          if (typeof formValue === 'boolean') {
            if (formValue !== originalValue)
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

            if (formValue !== originalValue && (formValue || originalValue))
              this.anyChanges = true;
          }
        }
      }
    );
  }

  deleteLCE() {

    if (!this.formId)
      return;

    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(res => {

      if (res) {

        this.progressService.enable();
        this.restService.delete(`lce/${this.companyType}/${this.formId}`).subscribe(data => {

          this.progressService.disable();
          this.snackBar.open('life cycle event has been deleted', null, {
            duration: 3200,
          });

          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;
          this.breadcrumbService.popChild();

        }, err => {

          this.progressService.disable();
          this.snackBar.open('Cannot delete this life cycle event. Please try again', null, {
            duration: 3200,
          });
          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;

        });
      }
    }, err => {

    });
  }

}
