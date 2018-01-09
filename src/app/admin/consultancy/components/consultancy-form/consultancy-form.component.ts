import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../shared/services/rest.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {AuthService} from '../../../../shared/services/auth.service';
import {forEach} from '@angular/router/src/utils/collection';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

enum ConsultingType {
  person,
  organization,
}

@Component({
  selector: 'ii-consultancy-form',
  templateUrl: './consultancy-form.component.html',
  styleUrls: ['./consultancy-form.component.css']
})
export class ConsultancyFormComponent implements OnInit {
  id = null;
  isPerson = false;
  isBiz = false;
  isOrg = false;
  isConsulting = false;
  consultancyId = null;
  consultancyForm: FormGroup;
  loadedValue: any = {};
  upsertBtnShouldDisabled = false;
  deleteBtnShouldDisabled = false;
  anyChanges = false;
  consultingType = ConsultingType;
  consulting = this.consultingType.person;
  consultingObj = {
    name: null,
    id: null,
  };
  consultancyObj = {
    name: null,
    id: null,
  };

  constructor(private restService: RestService, private breadcrumbService: BreadcrumbService,
              private router: Router, private route: ActivatedRoute,
              private progressService: ProgressService, private authService: AuthService,
              private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(
      (params) => {
        this.id = params['id'] ? +params['id'] : null;
        this.consultancyId = params['cnsid'] ? +params['cnsid'] : null;
        this.isConsulting = params['is_consulting'] ? (params['is_consulting'] === 'true' ? true : false) : false;
        this.isBiz = params['type'] ? false : true;
        this.isPerson = params['type'] ? (params['type'].toLowerCase() === 'person' ? true : false) : false;
        this.isOrg = params['type'] ? (params['type'].toLowerCase() === 'organization' ? true : false) : false;

        if (this.consultancyId)
          this.getConsultancy();

        this.breadcrumbService.pushChild((this.consultancyId ? 'Update' : 'Add') + ' Consultancy', this.router.url, false);
      },
      (err) => {
        console.error('Cannot parse parameters from url: ', err);
      }
    );
  }

  initForm() {
    this.consultancyForm = new FormBuilder().group({
      subject: [this.loadedValue.subject, [
        Validators.required
      ]],
      subject_fa: [this.loadedValue.subject_fa],
      is_mentor: [this.loadedValue.is_mentor ? this.loadedValue.is_mentor : false, [
        Validators.required,
      ]],
      is_confirmed: [this.loadedValue.is_confirmed ? this.loadedValue.is_confirmed : false, [
        Validators.required,
      ]],
    });

    this.consultancyForm.valueChanges.subscribe(
      (dt) => this.fieldChanged(),
      (er) => console.error('Error when subscribing on form valueChanges: ', er)
    );
  }

  getConsultancy() {
    if (!this.consultancyId)
      return;

    this.progressService.enable();
    this.restService.get('consultancy/' + this.consultancyId).subscribe(
      (data) => {
        this.loadedValue = data;
        if (this.isConsulting) {
          this.consultancyObj.id = data.bid;
          this.consultancyObj.name = data.biz_name || data.biz_name_fa;
        } else {
          if (data.pid) {
            this.consultingObj.id = data.pid;
            this.consultingObj.name = data.person_display_name || data.person_display_name_fa;
          } else if (data.oid) {
            this.consultingObj.id = data.oid;
            this.consultingObj.name = data.name || data.name_fa;
          }
        }

        this.initForm();
        this.progressService.disable();
      },
      (err) => {
        console.error('Cannot get consultancy details: ', err);
        this.progressService.disable();
      }
    );
  }

  modifyConsultancy() {
    if (!this.consultingObj.id && !this.consultancyObj.id)
      return;

    const data: any = {};

    Object.keys(this.consultancyForm.controls).forEach(el => {
      data[el] = this.consultancyForm.controls[el].value;
    });

    if (this.consultancyForm.controls['is_confirmed'].value)
      data.confirmed_by = this.authService.userId.getValue();

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    let url = '';
    if (this.isConsulting) {
      url = (this.isPerson ? 'personalConsultancy' : 'orgConsultancy') +
        '/' + (this.consultancyId ? this.consultancyId + '/' : '') +
        this.consultancyObj.id + '/' + this.id;
    } else {
      url = (this.consulting === this.consultingType.person ? 'personalConsultancy' : 'orgConsultancy') +
        '/' + (this.consultancyId ? this.consultancyId + '/' : '') +
        this.id + '/' + this.consultingObj.id;
    }

    (this.consultancyId ?
      this.restService.post(url, data) :
      this.restService.put(url, data))
      .subscribe(
        (rs) => {
          if (!this.consultancyId) {
            this.initForm();
            this.consultingObj = {
              id: null,
              name: null,
            };
            this.consultancyObj = {
              id: null,
              name: null,
            };
          } else {
            Object.keys(data).forEach(el => this.loadedValue[el] = data[el]);
            this.loadedValue.id = rs;
          }

          this.snackBar.open('The consultancy is ' + (this.consultancyId ? 'updated' : 'added') + ' successfully', null, {
            duration: 2300,
          });
          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;

          this.anyChanges = false;
        },
        (err) => {
          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;
        }
      );
  }

  deleteConsultancy() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data)
          this.restService.delete('consultancy/' + this.consultancyId).subscribe(
            (rs) => {
              this.snackBar.open('The consultancy is deleted successfully', null, {
                duration: 2300,
              });
              this.breadcrumbService.popChild();
            },
            (er) => {
              console.error('Cannot delete this investment');
            }
          );
      },
      (err) => {
        console.error('Error when closing dialog: ', err);
      }
    );
  }

  setConsulting(data) {
    this.consultingObj.id = this.consulting === this.consultingType.person ?
      data.pid :
      data.oid;
    this.consultingObj.name = this.consulting === this.consultingType.person ?
      (data.display_name_en || data.display_name_fa) :
      (data.name || data.name_fa);
    this.fieldChanged();
  }

  setTargetBusiness(data) {
    this.consultancyObj.id = data.bid;
    this.consultancyObj.name = data.name || data.name_fa;
    this.fieldChanged();
  }

  directToCnsDone() {
    let url = '/admin/';

    if (this.isConsulting)
      url += 'business/view/' + this.consultancyObj.id;
    else {
      if (this.consulting === this.consultingType.person)
        url += 'person';
      else if (this.consulting === this.consultingType.organization)
        url += 'organization';

      url += '/view/' + this.consultingObj.id;
    }

    this.router.navigate([url]);
  }

  fieldChanged() {
    if (!this.loadedValue || !Object.keys(this.loadedValue))
      return;

    this.anyChanges = false;

    Object.keys(this.consultancyForm.controls).forEach(el => {
      if (this.consultancyForm.controls[el].value != this.loadedValue[el])
        this.anyChanges = true;
    });

    if (this.consultancyObj.id) {
      if (this.consultancyObj.id !== this.loadedValue.bid)
        this.anyChanges = true;
    } else if (this.consultingObj.id) {
      const tempId = this.loadedValue[(this.consulting === this.consultingType.person ? 'pid' : 'oid')];
      if (this.consultingObj.id !== tempId)
        this.anyChanges = true;
    }
  }
}
