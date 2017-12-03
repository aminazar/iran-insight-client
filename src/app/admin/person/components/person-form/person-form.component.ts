import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../shared/services/auth.service';

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
  }
  get personId() {
    return this._personId;
  }

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

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initForm();
    this.initPerson();
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
      username: [null, [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*'),
      ]],
      password: [null, [
        Validators.minLength(8),
      ]],
      re_password: [null, [
        Validators.minLength(8),
      ]],
      image: [null],
      address_en: [null, [
        Validators.maxLength(500),
      ]],
      address_fa: [null, [
        Validators.maxLength(500),
      ]],
      phone_no: [null, [
        Validators.pattern('^\d$')
      ]],
      mobile_no: [null, [
        Validators.pattern('^\d$')
      ]],
      birth_date: [null],
      notify_period: ['d', [
        Validators.required,
      ]],
      display_name_en: [null],
      display_name_fa: [null],
    }, {
      validator: this.matchingPassword
    });
  }

  initPerson() {
    if (!this.personId){
      this.personForm = null;
      this.initForm();
      return;
    }

    this.authService.getPersonInfo(this.personId).subscribe(
      (data) => {
        data = data[0];
        this.originalPerson = data;

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
      },
      (err) => {
        console.log(err);
        this.snackBar.open('Cannot get user details. Please try again', null, {
          duration: 2500,
        });
      }
    );
  }

  modifyUser() {
    const data = {
      username: this.personForm.controls['username'].value,
      firstname_en: this.personForm.controls['firstname_en'].value,
      firstname_fa: this.personForm.controls['firstname_fa'].value,
      surname_en: this.personForm.controls['surname_en'].value,
      surname_fa: this.personForm.controls['surname_fa'].value,
      secret: this.personForm.controls['password'].value,
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
      delete data.secret;

    this.authService.setUserProfile(data).subscribe(
      (data) => {
        this.snackBar.open('This person is added', null, {
          duration: 1800,
        });
      },
      (err) => {
        this.snackBar.open('Cannot add this person. Try again', null, {
          duration: 2300,
        });
      }
    );
  }

  matchingPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('re_password').value;
    if (password !== confirmPassword)
      AC.get('re_password').setErrors({MathPassword: true});
    else
      return null;
  }
}
