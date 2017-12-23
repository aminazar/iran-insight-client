import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import * as moment from 'moment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RestService} from '../../../../shared/services/rest.service';


enum LCEType {
  ORG = 'organization',
  BIZ = 'business'
}


@Component({
  selector: 'ii-lce-form',
  templateUrl: './lce-form.component.html',
  styleUrls: ['./lce-form.component.css']
})
export class LceFormComponent implements OnInit {

  lceForm: FormGroup;
  anyChanges = false;
  joinerType: string;
  joinerKey: string;
  lceId: number;
  joinerId: number;
  id1: number;
  id2: number;
  panelOpenState = false;
  upsertBtnShouldDisabled = false;
  deleteBtnShouldDisabled = false;

  constructor(private router: Router,
              private breadCrumbService: BreadcrumbService,
              private snackBar: MatSnackBar,
              private progressService: ProgressService,
              private restService: RestService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.joinerType = params['type'];
      this.joinerId = params['id'];
      this.lceId = params['lceId'];

      this.breadCrumbService.pushChild(this.lceId ? 'update' : 'add', this.router.url, false);

    });
    this.joinerKey = this.joinerType === LCEType.BIZ ? 'bid' : 'oid';
    this.lceForm = new FormBuilder().group({
      location: [null],
      address_fa: [null],
      start_date: [new Date(), [
        Validators.required,
      ]],
      end_date: [null],
      description: [null],
      description_fa: [null],
    }, {
      validator: this.dateChecker
    });


  }

  getCurrentJoinerIds() {
    const currentIds: number[] = [];

    if (this.joinerId)
      currentIds.push(this.joinerId);
    if (this.id1)
      currentIds.push(this.id1);
    if (this.id2)
      currentIds.push(this.id2);

    return currentIds;
  }


  modifyLCE() {
    this.progressService.enable();
    this.restService.put(`lce/${this.joinerType}`, {}).subscribe(res => {

      this.progressService.disable();


    }, err => {

      this.progressService.disable();

    });


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


}
