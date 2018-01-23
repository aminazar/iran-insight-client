import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import {Params} from '@angular/router';
import {AbstractFormComponent} from '../../../../shared/components/abstract-form/abstract-form.component';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';


@Component({
  selector: 'ii-partnership-form',
  templateUrl: './partnership-form.component.html',
  styleUrls: ['./partnership-form.component.css']
})
export class PartnershipFormComponent extends AbstractFormComponent implements OnInit {
  personId: number;
  personName: string;
  possessorId: number;
  possessorName: number;
  possessorNameFa: number;
  joinerId: number;
  joinerName: string;
  joinerNameFa: string;

  ngOnInit() {
    this.viewName = 'Partnership';
    super.ngOnInit();
    this.initForm();

    this.route.params.subscribe((params: Params) => {
      this.personId = params['id'];
      this.personName = decodeURIComponent(params['personName']);
      this.initPartnership();
    });
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

  initPartnership() {
    if (!this.formId) {
      this.possessorId = this.personId;
      return;
    }
    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    this.restService.get(`person/partnership/${this.formId}`).subscribe(
      (res) => {

        this.originalForm = res[0];

        this.possessorId = res[0].possessor_id;
        this.possessorName = res[0].possessor_display_name;
        this.possessorNameFa = res[0].possessor_display_name_fa;
        this.joinerId = res[0].joiner_id;
        this.joinerName = res[0].joiner_display_name;
        this.joinerNameFa = res[0].joiner_display_name_fa;
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
        this.progressService.disable();
        this.upsertBtnShouldDisabled = true;
        this.deleteBtnShouldDisabled = true;
      }
    );
  }

  changeJoiner(event) {
    this.joinerId = event.pid;
    this.joinerName = event.display_name_en;
    this.joinerNameFa = event.display_name_fa;
    this.fieldChanged();
  }

  removeJoiner() {
    this.joinerId = null;
    this.joinerName = null;
    this.joinerNameFa = null;
    this.form.controls['is_confirmed'].setValue(false);
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

  modifyPartnership() {
    const partnershipData: any = {
      id: this.formId,
      pid1: this.possessorId,
      pid2: this.joinerId,
      start_date: this.form.controls['start_date'].value,
      end_date: this.form.controls['end_date'].value,
      description: this.form.controls['description'].value,
      description_fa: this.form.controls['description_fa'].value,
      is_confirmed: this.form.controls['is_confirmed'].value
    };

    if (!this.formId)
      delete partnershipData.id;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.restService.put(`person/partnership`, partnershipData).subscribe(
      (data) => {
        this.snackBar.open(this.formId ? 'Partnership is updated' : 'Partnership is added', null, {
          duration: 2300,
        });

        this.anyChanges = false;
        if (!this.formId) {
          this.form.reset();
          this.removeJoiner();
        } else {
          this.formId = data[0].id;
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
    if (!this.originalForm)
      return;

    this.anyChanges = false;

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

  deletePartnership() {
    if (!this.formId)
      return;

    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(res => {
      if (res) {
        this.progressService.enable();
        this.restService.delete(`person/partnership/${this.formId}`).subscribe(data => {

          this.progressService.disable();
          this.snackBar.open('Partnership has been deleted', null, {
            duration: 3200,
          });

          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;
          this.breadcrumbService.popChild();

        }, err => {
          this.progressService.disable();
          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;

        });
      }
    }, err => {

    });
  }
}
