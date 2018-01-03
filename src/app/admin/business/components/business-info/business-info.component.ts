import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RestService} from '../../../../shared/services/rest.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

@Component({
  selector: 'ii-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css']
})
export class BusinessInfoComponent implements OnInit, OnDestroy {

  bid: number;
  add = false;

  farsiForm;
  basicForm;
  productForm;
  generalForm;
  financialForm: FormGroup;
  loadedValue: any = {};
  upsertDisabled = false;
  deleteDisabled = false;
  ceoName  = '';
  step = 0;
  changed = false;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.bid = +params['bid'];
      this.add = !this.bid;
      if (!this.add) {
        this.restService.get(`business/one/${this.bid}`).subscribe(res => {
          this.loadedValue = res;
          this.setCEOName();
          this.initForm();
          this.progressService.disable();
        }, err => {
          this.progressService.disable();

        });
        this.progressService.enable();
      } else {
        this.initForm();
      }
      this.breadCrumbService.pushChild(this.add ? 'Add' : 'Update', this.router.url, false);
    });

  }

  setCEOName(lang = 'en') {
    this.ceoName = this.loadedValue[`surname_${lang}`] + (lang === 'en' ? ', ' : ' ،') + this.loadedValue[`firstname_${lang}`]
      + ` (${this.loadedValue[`display_name_${lang}`]})`;
  }

  ngOnDestroy() {
    ['farsiForm', 'basicForm', 'productForm', 'generalForm', 'financialForm'].forEach(form => this[form] = null);
  }

  initForm() {
    this.farsiForm = new FormBuilder().group({
      name_fa: [this.loadedValue.name_fa],
      address_fa: [this.loadedValue.address_fa, [
        Validators.maxLength(500),
      ]],
    });

    this.basicForm = new FormBuilder().group({
      bid: [this.bid],
      name: [this.loadedValue.name, [Validators.required]],
      address: [this.loadedValue.address, [
        Validators.maxLength(500),
        Validators.required,
      ]],
      tel: [this.loadedValue.tel, [
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{0,8}$/),
        Validators.required,
      ]],
      url: [this.loadedValue.url, [
        Validators.pattern(/(http|https):\/\/[^ "]+$/),
        Validators.required,
      ]],
      ceo_pid: [this.loadedValue.ceo_pid],
      latitude: [this.loadedValue.latitude ? this.loadedValue.latitude : 35.696491],
      longitude: [this.loadedValue.longitude ? this.loadedValue.longitude : 51.379926],
  })
    ;

    this.productForm = new FormBuilder().group({
      productName: [this.loadedValue.product ? this.loadedValue.product.name : null]
    });

    this.generalForm = new FormBuilder().group({});

    this.financialForm = new FormBuilder().group({});
  }

  setCEO(value) {
    this.basicForm.controls['ceo_pid'].setValue(value.pid);
    this.ceoName = value.display_name_en;
  }

  setMarker(data) {
    this.basicForm.controls['latitude'].setValue(data.coords.lat);
    this.basicForm.controls['longitude'].setValue(data.coords.lng);
  }

  getLatitude() {
    return this.basicForm.controls['latitude'].value;
  }

  getLongitude() {
    return this.basicForm.controls['longitude'].value;
  }

  upsertBusiness() {
    const bizData: any = {};
    ['farsiForm', 'basicForm'].forEach(form => {
      if (this[form].valid) {
        for (const key in this[form].controls)
          if (this[form].controls.hasOwnProperty(key) && this.loadedValue[key] !== this[form].controls[key].value) {
            bizData[key] = this[form].controls[key].value;
            this.changed = true;
          }
      }
    });

    if (this.add)
      delete bizData.bid;
    else
      bizData.bid = this.bid;

    if (this.changed && this.farsiForm.valid && this.basicForm.valid) {
      this.progressService.enable();
      this.upsertDisabled = true;
      this.deleteDisabled = true;

      this.restService.post('business/profile', bizData)
        .subscribe(
          data => {
            this.snackBar.open(`Business is ${this.add ? 'added' : 'updated'}.`, null, {duration: 2300});
            this.progressService.disable();
            this.loadedValue = bizData;
            if (this.add)
              this.loadedValue.bid = data;
            this.initForm();
            this.changed = false;
            this.upsertDisabled = false;
            this.deleteDisabled = false;
          },
          err => {
            // this.snackBar.open('Cannot ' + (this.add ? 'add' : 'update') + ' this business: ' + err.message, null, {
            //   duration: 3200,
            // });
            this.initForm();
            this.progressService.disable();
            this.upsertDisabled = false;
            this.deleteDisabled = false;
          });
    }
  }

  deleteBusiness() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '250px'
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.upsertDisabled = true;
          this.deleteDisabled = true;

          this.restService.delete('business/one/' + this.loadedValue.bid).subscribe(
            () => {
              this.router.navigate(['admin', 'business'])
                .then(() => {
                  this.snackBar.open('Business is deleted successfully', null, {
                    duration: 2000,
                  });
                });
              this.progressService.disable();
              this.upsertDisabled = false;
              this.deleteDisabled = false;
            },
            (error) => {
              this.progressService.disable();
              this.upsertDisabled = false;
              this.deleteDisabled = false;
            }
          );
        }
      },
      (err) => {
        console.error('Error in dialog: ', err);
      }
    );
  }
}
