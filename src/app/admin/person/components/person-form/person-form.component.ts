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
import {CanComponentDeactivate} from '../../../leavingGuard';
import {AbstractFormComponent} from '../../../../shared/components/abstract-form/abstract-form.component';

@Component({
  selector: 'ii-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent extends AbstractFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  periodTypes = [{
    title: 'Daily',
    value: 'd',
  }, {
    title: 'Weekly',
    value: 'w',
  }, {
    title: 'Monthly',
    value: 'm',
  }, {
    title: 'Never',
    value: 'n',
  }];
  actionEnum = ActionEnum;
  resetPasswordBtnShouldDisabled = false;

  ngOnInit() {
    this.viewName = 'Person';
    super.ngOnInit();
    this.initForm();
    this.route.params.subscribe(
      (params) => {
        this.initPerson();
      }
    );
  }


  initForm() {
    this.form = new FormBuilder().group({
      firstname_en: [null],
      firstname_fa: [null],
      surname_en: [null],
      surname_fa: [null],
      username: [{value: null, disabled: this.formId ? true : false}, [
        Validators.required,
        Validators.email,
      ]],
      image: [null],
      address_en: [null, [
        Validators.maxLength(500),
      ]],
      address_fa: [null, [
        Validators.maxLength(500),
      ]],
      phone_no: [null, [
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{0,8}$/)
      ]],
      mobile_no: [null, [
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/)
      ]],
      birth_date: [null],
      notify_period: ['d', [
        Validators.required,
      ]],
      display_name_en: [null],
      display_name_fa: [null],
    });

    this.form.valueChanges.subscribe(
      (data) => {
        this.fieldChanged();
      },
      (err) => {
        console.error('Error: ', err);
      }
    );
  }

  initPerson() {

    if (!this.formId)
      return;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.authService.getPersonInfo(this.formId).subscribe(
      (data) => {
        data = data[0];
        this.form.controls['username'].setValue(data.username);
        this.form.controls['firstname_en'].setValue(data.firstname_en);
        this.form.controls['firstname_fa'].setValue(data.firstname_fa);
        this.form.controls['surname_en'].setValue(data.surname_en);
        this.form.controls['surname_fa'].setValue(data.surname_fa);
        this.form.controls['image'].setValue(data.image);
        this.form.controls['address_en'].setValue(data.address_en);
        this.form.controls['address_fa'].setValue(data.address_fa);
        this.form.controls['phone_no'].setValue(data.phone_no);
        this.form.controls['mobile_no'].setValue(data.mobile_no);
        this.form.controls['birth_date'].setValue(data.birth_date);
        this.form.controls['display_name_en'].setValue(data.display_name_en);
        this.form.controls['display_name_fa'].setValue(data.display_name_fa);
        this.form.controls['notify_period'].setValue(data.notify_period);

        this.originalForm = data;

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

  modifyUser() {
    const personData = {
      pid: this.formId,
      username: this.form.controls['username'].value,
      firstname_en: this.form.controls['firstname_en'].value,
      firstname_fa: this.form.controls['firstname_fa'].value,
      surname_en: this.form.controls['surname_en'].value,
      surname_fa: this.form.controls['surname_fa'].value,
      image: this.form.controls['image'].value,
      address_en: this.form.controls['address_en'].value,
      address_fa: this.form.controls['address_fa'].value,
      phone_no: this.form.controls['phone_no'].value,
      mobile_no: this.form.controls['mobile_no'].value,
      birth_date: this.form.controls['birth_date'].value,
      notify_period: this.form.controls['notify_period'].value,
      display_name_en: this.form.controls['display_name_en'].value,
      diplay_name_fa: this.form.controls['display_name_fa'].value,
    };

    if (!this.formId)
      delete personData.pid;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.authService.setUserProfile(personData).subscribe(
      (data) => {
        this.snackBar.open(this.formId ? 'Person is updated' : 'Person is added', null, {
          duration: 2300,
        });

        this.anyChanges = false;
        this.changedForm.emit({
          action: this.formId ? this.actionEnum.modify : this.actionEnum.add,
          value: Object.assign({pid: data.pid}, personData)
        });

        if (!this.formId) {
          this.form.reset();
          this.form.controls['notify_period'].setValue('d');
        } else {
          this.originalForm = Object.assign({pid: data.pid}, personData);
          this.formId = data;
        }

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        this.snackBar.open('Cannot ' + this.formId ? 'add' : 'update' + ' this person. Try again', null, {
          duration: 3200,
        });
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

    Object.keys(this.form.controls).filter(el => !['image', 'username'].includes(el)).forEach(el => {
      let formValue = this.form.controls[el].value;
      let originalValue = this.originalForm[el];

      if (el === 'birth_date') {
        if ((moment(formValue).format('YYYY-MM-DD') !== moment(originalValue).format('YYYY-MM-DD'))
            && (formValue !== '' || originalValue !== null))
          this.anyChanges = true;
      } else {
        if (['firstname_en', 'firstname_fa', 'surname_en', 'surname_fa', 'username', 'address_en', 'address_fa',
            'phone_no', 'mobile_no', 'birth_date', 'display_name_en', 'display_name_fa'].includes(el)) {
          if (formValue && formValue.trim().length <= 0)
            formValue = null;
          else if (formValue)
            formValue = formValue.trim();

          if (originalValue && originalValue.trim().length <= 0)
            originalValue = null;
          else if (originalValue)
            originalValue = originalValue.trim();
        }

        if (formValue !== originalValue && (formValue !== '' || originalValue !== null))
          this.anyChanges = true;
      }
    });
  }

  deletePerson() {
    super.delete().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.upsertBtnShouldDisabled = true;
          this.deleteBtnShouldDisabled = true;

          this.authService.deletePerson(this.formId).subscribe(
            (dt) => {
              this.snackBar.open('Person is deleted successfully', null, {
                duration: 2000,
              });

              this.changedForm.emit({action: this.actionEnum.delete, value: this.formId});

              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;

              this.breadcrumbService.popChild();
            },
            (error) => {
              this.snackBar.open('Cannot delete this person. Please try again', null, {
                duration: 3200,
              });

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

  resetPassword() {
    this.progressService.enable();
    this.resetPasswordBtnShouldDisabled = true;

    this.authService.resetPassword(this.form.controls['username'].value).subscribe(
      (data) => {
        this.snackBar.open('Resetting password mail sent to ' + this.form.controls['username'].value, null, {
          duration: 2700,
        });

        this.progressService.disable();
        this.resetPasswordBtnShouldDisabled = false;
      },
      (err) => {
        console.error('Cannot send change mail. ', err);
        this.snackBar.open('Cannot reset password. Please try again', null, {
          duration: 3000,
        });

        this.progressService.disable();
        this.resetPasswordBtnShouldDisabled = false;
      }
    );
  }
}
