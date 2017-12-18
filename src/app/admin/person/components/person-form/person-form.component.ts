import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';
import {RemovingConfirmComponent} from "../../../../shared/components/removing-confirm/removing-confirm.component";
import {ActionEnum} from "../../../../shared/enum/action.enum";
import {ProgressService} from "../../../../shared/services/progress.service";
import * as moment from 'moment';

@Component({
  selector: 'ii-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit, OnDestroy {
  @Input()
  set personId(id) {
    this._personId = id;
    this.initPerson();
    this.personForm = null;
    this.initForm();
  }

  get personId() {
    return this._personId;
  }

  @Output() changedPerson = new EventEmitter();

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
  personForm: FormGroup;
  _personId: number = null;
  originalPerson: any = null;
  anyChanges = false;
  actionEnum = ActionEnum;

  upsertBtnShouldDisabled: boolean = false;
  deleteBtnShouldDisabled: boolean = false;
  resetPasswordBtnShouldDisabled: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private progressService: ProgressService) {
  }

  ngOnInit() {
    this.initForm();

    this.personForm.valueChanges.subscribe(
      (data) => {
        this.fieldChanged();
      },
      (err) => {
        console.error('Error: ', err);
      }
    );
  }

  ngOnDestroy() {
    this.personForm = null;
  }

  initForm() {
    this.personForm = new FormBuilder().group({
      firstname_en: [null],
      firstname_fa: [null],
      surname_en: [null],
      surname_fa: [null],
      username: [{value: null, disabled: this.personId ? true : false}, [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*'),
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
  }

  initPerson() {
    if (!this.personId) {
      this.personForm = null;
      this.initForm();
      return;
    }

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.authService.getPersonInfo(this.personId).subscribe(
      (data) => {
        data = data[0];
        this.personForm.controls['username'].setValue(data.username);
        this.personForm.controls['firstname_en'].setValue(data.firstname_en);
        this.personForm.controls['firstname_fa'].setValue(data.firstname_fa);
        this.personForm.controls['surname_en'].setValue(data.surname_en);
        this.personForm.controls['surname_fa'].setValue(data.surname_fa);
        this.personForm.controls['image'].setValue(data.image);
        this.personForm.controls['address_en'].setValue(data.address_en);
        this.personForm.controls['address_fa'].setValue(data.address_fa);
        this.personForm.controls['phone_no'].setValue(data.phone_no);
        this.personForm.controls['mobile_no'].setValue(data.mobile_no);
        this.personForm.controls['birth_date'].setValue(data.birth_date);
        this.personForm.controls['display_name_en'].setValue(data.display_name_en);
        this.personForm.controls['display_name_fa'].setValue(data.display_name_fa);
        this.personForm.controls['notify_period'].setValue(data.notify_period);

        this.originalPerson = data;

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
      pid: this.personId,
      username: this.personForm.controls['username'].value,
      firstname_en: this.personForm.controls['firstname_en'].value,
      firstname_fa: this.personForm.controls['firstname_fa'].value,
      surname_en: this.personForm.controls['surname_en'].value,
      surname_fa: this.personForm.controls['surname_fa'].value,
      image: this.personForm.controls['image'].value,
      address_en: this.personForm.controls['address_en'].value,
      address_fa: this.personForm.controls['address_fa'].value,
      phone_no: this.personForm.controls['phone_no'].value,
      mobile_no: this.personForm.controls['mobile_no'].value,
      birth_date: this.personForm.controls['birth_date'].value,
      notify_period: this.personForm.controls['notify_period'].value,
      display_name_en: this.personForm.controls['display_name_en'].value,
      diplay_name_fa: this.personForm.controls['display_name_fa'].value,
    };

    if (!this.personId)
      delete personData.pid;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.authService.setUserProfile(personData).subscribe(
      (data) => {
        this.snackBar.open(this.personId ? 'Person is updated' : 'Person is added', null, {
          duration: 2300,
        });

        this.anyChanges = false;
        this.changedPerson.emit({action: this.personId ? this.actionEnum.modify :  this.actionEnum.add, value: Object.assign({pid: data.pid}, personData)});
        this.originalPerson = Object.assign({pid: data.pid}, personData);
        this.personId = data.pid;

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        this.snackBar.open('Cannot ' + this.personId ? 'add' : 'update' + ' this person. Try again', null, {
          duration: 3200,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      }
    );
  }

  fieldChanged() {
    if(!this.originalPerson)
      return;

    this.anyChanges = false;

    Object.keys(this.personForm.controls).filter(el => !['image', 'username'].includes(el)).forEach(el => {
      let formValue = this.personForm.controls[el].value;
      let originalValue = this.originalPerson[el];

      if(el === 'birth_date'){
        if((moment(formValue).format('YYYY-MM-DD') !== moment(originalValue).format('YYYY-MM-DD')) && (formValue !== '' || originalValue !== null))
          this.anyChanges = true;
      }
      else{
        if(['firstname_en', 'firstname_fa', 'surname_en', 'surname_fa', 'username', 'address_en', 'address_fa', 'phone_no', 'mobile_no', 'birth_date', 'display_name_en', 'display_name_fa'].includes(el)){
          if(formValue && formValue.trim().length <= 0)
            formValue = null;
          else if(formValue)
            formValue = formValue.trim();

          if(originalValue && originalValue.trim().length <= 0)
            originalValue = null;
          else if(originalValue)
            originalValue = originalValue.trim();
        }

        if(formValue !== originalValue && (formValue !== '' || originalValue !== null))
          this.anyChanges = true;
      }
    });
  }

  deletePerson() {
    let rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '250px'
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.upsertBtnShouldDisabled = true;
          this.deleteBtnShouldDisabled = true;

          this.authService.deletePerson(this.personId).subscribe(
            (dt) => {
              this.snackBar.open('Person is deleted successfully', null, {
                duration: 2000,
              });

              this.changedPerson.emit({action: this.actionEnum.delete, value: this.personId});

              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;
            },
            (error) => {
              this.snackBar.open('Cannot delete this person. Please try again', null, {
                duration: 3200,
              });

              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;
            }
          )
        }
      },
      (err) => {
        console.error('Error in dialog: ', err);
      }
    )
  }

  resetPassword(){
    this.progressService.enable();
    this.resetPasswordBtnShouldDisabled = true;

    this.authService.resetPassword(this.personForm.controls['username'].value).subscribe(
      (data) => {
        this.snackBar.open('Resetting password mail sent to ' + this.personForm.controls['username'].value, null, {
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
