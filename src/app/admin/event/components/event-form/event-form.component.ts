import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../../../shared/services/progress.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {RestService} from '../../../../shared/services/rest.service';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {LeavingConfirmComponent} from '../../../../shared/components/leaving-confirm/leaving-confirm.component';
import {CanComponentDeactivate} from '../../../leavingGuard';


enum OrganizerType {
  person,
  business,
  organization,
}

@Component({
  selector: 'ii-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit, CanComponentDeactivate {
  @Input()
  set eventId(id) {
    // this.originalEvent = null;
    // this.organizerId = null;
    // this.organizerName = null;
    this._eventId = id;
    // this.eventForm = null;
    // this.initForm();
    // this.initEvent();
    // this.initLocation();
  }

  get eventId() {
    return this._eventId;
  }

  @Output() changedEvent = new EventEmitter<any>();

  private _eventId: number;
  eventForm: FormGroup;
  upsertBtnShouldDisabled = false;
  deleteBtnShouldDisabled = false;
  anyChanges = false;
  originalEvent: any = null;
  actionEnum = ActionEnum;
  organizerType = OrganizerType;
  organizer = this.organizerType.person;
  organizerId: number = null;
  organizerName: string = null;
  latitude = 35.696491;
  longitude = 51.379926;
  organizerHasError = false;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog,
              private progressService: ProgressService, private restService: RestService,
              private router: Router, private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(
      (params) => {
        this.eventId = +params['id'] ? +params['id'] : null;
        if (this.eventId)
          this.breadcrumbService.pushChild('Update Event', this.router.url, false);
        else {
          this.breadcrumbService.pushChild('Add Event', this.router.url, false);
          this.organizer = this.organizerType.person;
        }
      }
    );

    this.initEvent();
    this.initLocation();
  }

  initForm() {
    this.eventForm = new FormBuilder().group({
      title: [null, [
        Validators.required,
        (c: FormControl) => {
          return (c.value && c.value.trim().length > 0) ? null : {notEmpty: 'Title cannot be empty'};
        },
      ]],
      title_fa: [null, [
        Validators.required,
        (c: FormControl) => {
          return (c.value && c.value.trim().length > 0) ? null : {notEmpty: 'عنوان نمی تواند خالی باشد'};
        },
      ]],
      location: [null],
      address: [null],
      address_fa: [null],
      start_date: [new Date(), [
        Validators.required,
      ]],
      // organizer_name: [null, [
      //   Validators.required,
      // ]],
      // organizer_name_fa: [null, [
      //   Validators.required,
      // ]],
      end_date: [null],
      description: [null],
      description_fa: [null],
    }, {
      validator: this.dateChecker
    });

    this.eventForm.valueChanges.subscribe(
      (data) => this.eventChanged(),
      (err) => {
        console.error('Error: ', err);
      }
    );
  }

  initEvent() {
    if (!this.eventId) {
      this.eventForm = null;
      this.initForm();
      return;
    }

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.restService.get('event/' + this.eventId).subscribe(
      (data) => {
        Object.keys(this.eventForm.controls).forEach(el => {
          if (el === 'start_date' || el === 'end_date')
            this.eventForm.controls[el].setValue(data[el] ? moment(data[el]).format('YYYY-MM-DD') : null);
          else
            this.eventForm.controls[el].setValue(data[el]);
        });

        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.organizerName = data.organizer_name || data.organizer_name_fa;

        this.organizerId = data.organizer_pid || data.organizer_bid || data.organizer_oid;
        if (data.organizer_pid)
          this.organizer = this.organizerType.person;
        else if (data.organizer_bid)
          this.organizer = this.organizerType.business;
        else
          this.organizer = this.organizerType.organization;

        this.originalEvent = data;
        this.originalEvent.start_date = data.start_date ? moment(data.start_date).format('YYYY-MM-DD') : null;
        this.originalEvent.end_date = data.end_date ? moment(data.end_date).format('YYYY-MM-DD') : null;

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        console.error(err);
        this.snackBar.open('Cannot get event details. Please try again', null, {
          duration: 3200,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = true;
        this.deleteBtnShouldDisabled = true;
      }
    );
  }

  dateChecker(AC: AbstractControl) {
    const sd = AC.get('start_date').value;
    const ed = AC.get('end_date').value;

    if (sd === null || sd === '')
      AC.get('start_date').setErrors({notNull: 'Start date cannot be null'});
    if (moment(sd).isAfter(ed)) {
      AC.get('start_date').setErrors({compare: 'Start date must be before end date'});
    } else {
      return null;
    }
  }

  modifyEvent() {
    if (!this.organizerId) {
      this.snackBar.open('Organizer cannot be empty. Please choose an organizer', null, {
        duration: 3200,
      });
      return;
    }

    let eventData = {};
    Object.keys(this.eventForm.controls).filter(el => !['organizer_name', 'organizer_name_fa'].includes(el)).forEach(el => {
      if (el === 'start_date' || el === 'end_date')
        eventData[el] = this.eventForm.controls[el].value ? moment(this.eventForm.controls[el].value).format('YYYY-MM-DD') : null;
      else
        eventData[el] = this.eventForm.controls[el].value;
    });

    eventData = Object.assign({
      eid: this.eventId,
      organizer_pid: this.organizer === this.organizerType.person ? this.organizerId : null,
      organizer_bid: this.organizer === this.organizerType.business ? this.organizerId : null,
      organizer_oid: this.organizer === this.organizerType.organization ? this.organizerId : null,
      latitude: this.latitude,
      longitude: this.longitude,
    }, eventData);


    if (!this.eventId)
      delete eventData['eid'];

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    (this.eventId
      ?
      this.restService.post('event/' + this.eventId, eventData)
      :
      this.restService.put('event', eventData))
      .subscribe(
        (data) => {
          this.snackBar.open(this.eventId ? 'Event is updated' : 'Event is added', null, {
            duration: 2300,
          });

          this.anyChanges = false;
          this.changedEvent.emit({
            action: this.eventId ? this.actionEnum.modify : this.actionEnum.add,
            value: Object.assign({
              eid: data,
              organizerName: this.organizerName,
            }, eventData)
          });

          if (!this.eventId) {
            this.organizerId = null;
            this.organizerName = null;
            this.eventForm.reset();
            this.eventForm.controls['start_date'].setValue(new Date());
          } else {
            this.originalEvent = Object.assign({eid: data}, eventData);
            this.eventId = data;
          }

          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;
        },
        (err) => {
          this.snackBar.open('Cannot ' + (this.eventId ? 'update' : 'add') + ' this event. Try again', null, {
            duration: 3200,
          });
          this.progressService.disable();
          this.upsertBtnShouldDisabled = false;
          this.deleteBtnShouldDisabled = false;
        }
      );
  }

  eventChanged() {
    if (!this.originalEvent)
      return;

    this.anyChanges = false;

    Object.keys(this.eventForm.controls).filter(el => el !== 'location').forEach(el => {
      let formValue = this.eventForm.controls[el].value;
      let originalValue = this.originalEvent[el];

      if (el === 'start_date' || el === 'end_date') {
        if ((moment(formValue).format('YYYY-MM-DD') !== moment(originalValue).format('YYYY-MM-DD')) &&
          (formValue !== '' || originalValue !== null))
          this.anyChanges = true;
      } else {
        if (['title',
            'title_fa',
            'address',
            'address_fa',
            'description',
            'description_fa',
            'organizer_name',
            'organizer_name_fa'].includes(el)) {
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

    if (this.latitude !== this.originalEvent.latitude || this.longitude !== this.originalEvent.longitude)
      this.anyChanges = true;

    if (this.organizerId !== (this.originalEvent.organizer_pid || this.originalEvent.organizer_bid || this.originalEvent.organizer_oid))
      this.anyChanges = true;

    if (!this.organizerId)
      this.organizerHasError = true;
    else
      this.organizerHasError = false;
  }

  deleteEvent() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '250px',
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.upsertBtnShouldDisabled = true;
          this.deleteBtnShouldDisabled = true;

          this.restService.delete('event/' + this.eventId).subscribe(
            (dt) => {
              this.snackBar.open('Event is deleted successfully', null, {
                duration: 2000,
              });

              this.changedEvent.emit({action: this.actionEnum.delete, value: this.eventId});

              this.progressService.disable();
              this.upsertBtnShouldDisabled = false;
              this.deleteBtnShouldDisabled = false;

              this.breadcrumbService.popChild();
            },
            (error) => {
              this.snackBar.open('Cannot delete this event. Please try again', null, {
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

  organizerIsPerson() {
    return (this.organizer === this.organizerType.person);
  }

  organizerIsBiz() {
    return (this.organizer === this.organizerType.business);
  }

  organizerIsOrg() {
    return (this.organizer === this.organizerType.organization);
  }

  setOrganizer(value) {
    switch (this.organizer) {
      case this.organizerType.person: {
        this.organizerId = value.pid;
        this.organizerName = value.display_name_en || value.display_name_fa;
      }
        break;
      case this.organizerType.business: {
        this.organizerId = value.bid;
        this.organizerName = value.name || value.name_fa;
      }
        break;
      case this.organizerType.organization: {
        this.organizerId = value.oid;
        this.organizerName = value.name || value.name_fa;
      }
        break;
    }

    this.eventChanged();
  }

  directToOrganizer() {
    if (this.organizerId) {
      let url = '/admin/';
      switch (this.organizer) {
        case this.organizerType.person:
          url += 'person';
          break;
        case this.organizerType.business:
          url += 'business';
          break;
        case this.organizerType.organization:
          url += 'organization';
          break;
      }

      url += ('/' + this.organizerId);

      this.router.navigate([url]);
    }
  }

  setMarker(data) {
    this.latitude = data.coords.lat;
    this.longitude = data.coords.lng;

    this.eventChanged();
  }

  initLocation() {
    if (navigator.geolocation && !this.eventId) {
      navigator.geolocation.getCurrentPosition(el => {
        this.latitude = el.coords.latitude;
        this.longitude = el.coords.longitude;
      }, err => {
        console.log('ERROR: ', err);
      });
    }
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
