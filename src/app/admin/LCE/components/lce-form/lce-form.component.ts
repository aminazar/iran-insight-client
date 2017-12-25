import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import * as moment from 'moment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RestService} from '../../../../shared/services/rest.service';
import {AbstractFormComponent} from '../../../../shared/components/abstract-form/abstract-form.component';
import {ILCE} from '../../interfaces/lce.interface';


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

  possessorType: string;
  possessorKey: string;
  possessorId: number;
  possessorName: string;

  joinerId: number;
  joinerName: string;
  joinerNameFa: string;

  lce_type_id: number;
  lce_type_name: string;
  lce_type_name_fa: string;

  lce: ILCE;


  ngOnInit() {

    this.viewName = 'Life Cycle Event';
    super.ngOnInit();
    this.initForm();

    this.route.params.subscribe((params: Params) => {

      this.possessorType = this.router.url.split('/')[2];
      this.possessorId = params['id'];
    });
    this.route.params.subscribe(
      (params) => {
        this.initLCE();
      }
    );
    this.route.queryParams.subscribe(params => {
      this.possessorName = params['possessorName'] || '';
    });

    this.possessorKey = this.possessorType === LCEType.BIZ ? 'bid' : 'oid';

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

    if (!this.formId)
      return;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    this.restService.get(`lce/${this.possessorType}/${this.possessorId}/${this.formId}`).subscribe(
      (res) => {


        console.log('-> ', res);

        // this.form.controls['username'].setValue(data.username);
        // this.form.controls['firstname_en'].setValue(data.firstname_en);
        // this.form.controls['firstname_fa'].setValue(data.firstname_fa);
        // this.form.controls['surname_en'].setValue(data.surname_en);
        // this.form.controls['surname_fa'].setValue(data.surname_fa);
        // this.form.controls['image'].setValue(data.image);
        // this.form.controls['address_en'].setValue(data.address_en);
        // this.form.controls['address_fa'].setValue(data.address_fa);
        // this.form.controls['phone_no'].setValue(data.phone_no);
        // this.form.controls['mobile_no'].setValue(data.mobile_no);
        // this.form.controls['birth_date'].setValue(data.birth_date);
        // this.form.controls['display_name_en'].setValue(data.display_name_en);
        // this.form.controls['display_name_fa'].setValue(data.display_name_fa);
        // this.form.controls['notify_period'].setValue(data.notify_period);
        //
        // this.originalForm = data;

        this.progressService.disable();
        // this.upsertBtnShouldDisabled = false;
        // this.deleteBtnShouldDisabled = false;
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

    this.lce_type_id = event.id;
    this.lce_type_name = event.name;
    this.lce_type_name_fa = event.name_fa;

  }

  changeJoiner(event) {

    this.joinerId = event.bid;
    this.joinerName = event.name;
    this.joinerNameFa = event.name_fa;

  }

  removeJoiner() {
    this.joinerId = null;
    this.joinerName = null;
    this.joinerNameFa = null;

  }

  getCurrentJoinerIds(): number[] {
    const currentIds: number[] = [];

    if (this.possessorId)
      currentIds.push(this.possessorId);
    if (this.lce && this.lce.joiner_id)
      currentIds.push(this.lce.joiner_id);

    return currentIds;
  }

  getCurrentTypeId(): number[] {
    const currentIds: number[] = [];

    if (this.lce_type_id)
      currentIds.push(this.lce_type_id);
    return currentIds;
  }


  modifyLCE() {

    const lceData = {
      id: this.formId,
      id1: this.possessorId,
      id2: this.lce.joiner_id,
      start_date: this.form.controls['start_date'].value,
      end_date: this.form.controls['end_date'].value,
      description: this.form.controls['description'].value,
      description_fa: this.form.controls['description_fa'].value,
      lce_type_id: this.lce.lce_type_id
    };

    if (!this.formId)
      delete lceData.id;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.restService.put(`lce/${this.possessorType}`, lceData).subscribe(
      (data) => {
        this.snackBar.open(this.formId ? 'Life cycle event is updated' : 'Life cycle event is added', null, {
          duration: 2300,
        });

        this.anyChanges = false;

        if (!this.formId) {
          this.form.reset();
        } else {
          this.originalForm = Object.assign({pid: data.pid}, lceData);
          this.formId = data.pid;
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
    if (!this.originalForm)
      return;
  }

}
