import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
// import {RemovingConfirmComponent} from '../../../shared/components/removing-confirm/removing-confirm.component';
import {LeavingConfirmComponent} from '../../../shared/components/leaving-confirm/leaving-confirm.component';

import {BreadcrumbService} from '../../../shared/services/breadcrumb.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isUndefined} from "util";
import {ProgressService} from "../../../shared/services/progress.service";
import {AuthService} from "../../../shared/services/auth.service";
import {ActionEnum} from "../../../shared/enum/action.enum";

@Component({
  selector: 'ii-expertise-form',
  templateUrl: './expertise-form.component.html',
  styleUrls: ['./expertise-form.component.css']
})
export class ExpertiseFormComponent implements OnInit, OnDestroy {
  // userExpertiseList = [];
  // personId: number = null;
  // currentExpertiseIds: number[] = [];
  @Input()
    set expertiseId(id) {
    this._expertiseId = id;
  }
  get expertiseId() {
    return this._expertiseId;
  }

  @Output() changedExpertise = new EventEmitter();

  expertiseForm: FormGroup;
  _expertiseId: number = null;
  personId: number = null;
  originalExpertise: any = null;
  anyChanges = false;
  actionEnum = ActionEnum;
  upsertBtnShouldDisabled: boolean = false;
  deleteBtnShouldDisabled: boolean = false;


  // constructor(private route: ActivatedRoute, private restService: RestService,
  //             private snackBar: MatSnackBar, private breadcrumbService: BreadcrumbService,
  //             private router: Router, public dialog: MatDialog) {
  // }
  constructor(private route: ActivatedRoute, private progressService: ProgressService,
              private authService: AuthService, private snackBar: MatSnackBar,
              private restService: RestService, private breadcrumbService: BreadcrumbService,
              private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(
      (params) => {
        this.expertiseId = +params['id'] ? +params['id'] : null;
        this.personId = +params['pid'] ? +params['pid'] : null;
        this.initExpertise();

        if(!this.expertiseId) {
          this.breadcrumbService.pushChild('Add new Expertise', this.router.url, false);
        }
        else {
          this.restService.get('/expertise/' + this.expertiseId).subscribe(
            (data) => {
              this.breadcrumbService.pushChild('Update', this.router.url, false);
            },
            (err) => {
              console.error("ERROR CAUGHT!", err);
            }
          );
        }
      }
    );
    this.expertiseForm.valueChanges.subscribe(
      (data) => {
        this.fieldChanged();
      },
      (err) => {
        console.error('Error: ', err);
      }
    );
  }

  ngOnDestroy() {
    this.expertiseForm = null;
  }

  initForm() {
    this.expertiseForm = new FormBuilder().group({
      name: [null, [
        Validators.required,
      ]],
      name_fa: [null, [
        Validators.required,
      ]],
      is_education: [false],
    }, {
      validator: this.nameRequiring,
    });
  }

  initExpertise() {
    if(!this.expertiseId) {
      this.expertiseForm = null;
      this.initForm();
      return;
    }

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.authService.getExpertiseInfo(this.expertiseId).subscribe(
      (data) => {
        data = data[0];

        this.expertiseForm.controls['name'].setValue(data.name_en);
        this.expertiseForm.controls['name_fa'].setValue(data.name_fa);
        this.expertiseForm.controls['is_education'].setValue(data.is_education);
        this.originalExpertise = data;

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
      },
      (err) => {
        console.log(err);
        this.snackBar.open('Cannot get expertise details. Please try again', null, {
          duration: 2500,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = true;
      }
    );
  }

  modifyExpertise() {
    const data = {
      expertise_id: this.expertiseId,
      person_id: this.personId,
      name_en: this.expertiseForm.controls['name'].value,
      name_fa: this.expertiseForm.controls['name_fa'].value,
      is_education: this.expertiseForm.controls['is_education'].value,
    };

    if(!this.expertiseId)
      delete data.expertise_id;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;
    this.restService.put('/expertise', data).subscribe(
      (value) => {
        this.snackBar.open(this.expertiseId ? 'Expertise is updated' : 'Expertise is added', null, {
          duration: 2300,
        });

        this.anyChanges = false;
        this.changedExpertise.emit({
          action: this.expertiseId ? this.actionEnum.modify : this.actionEnum.add,
          value: Object.assign({expertise_id: value.expertise_id}, data)
        });

        if(!this.expertiseId) {
          this.expertiseForm.reset();
        }
        else {
          this.originalExpertise = Object.assign({expertise_id: data.expertise_id}, data);
          this.expertiseId = data.expertise_id;
        }

        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      },
      (err) => {
        this.snackBar.open('Cannot ' + this.expertiseId ? 'add' : 'update' + 'this product. Try again', null, {
          duration: 3200,
        });
        this.progressService.disable();
        this.upsertBtnShouldDisabled = false;
        this.deleteBtnShouldDisabled = false;
      }
    );
  }

  deleteExpertise() {

  }

  fieldChanged() {
    if(!this.originalExpertise)
      return;

    this.anyChanges = false;

    let name = (this.expertiseForm.controls['name'].value === null || isUndefined(this.expertiseForm.controls['name'].value)) ? '' : this.expertiseForm.controls['name'].value;
    name = name.trim();
    let name_fa = (this.expertiseForm.controls['name_fa'].value === null || isUndefined(this.expertiseForm.controls['name_fa'].value)) ? '' : this.expertiseForm.controls['name_fa'].value;
    name_fa = name_fa.trim();
    let is_education = this.expertiseForm.controls['is_education'].value;

    let orig_name = this.originalExpertise.name_en;
    orig_name = orig_name.trim();
    let orig_name_fa = this.originalExpertise.name_fa;
    orig_name_fa = orig_name_fa.trim();
    let orig_is_education = this.originalExpertise.is_education;

    if(name !== orig_name && (name !== '' || orig_name !== null))
      this.anyChanges = true;
    if(name_fa !== orig_name_fa && (name_fa !== '' || orig_name_fa !== null))
      this.anyChanges = true;
    if(is_education !== orig_is_education)
      this.anyChanges = true;
  }

  nameRequiring(Ac: AbstractControl) {
    let name = Ac.get('name').value;
    let name_fa = Ac.get('name_fa').value;
    if (name === null || isUndefined(name))
      name = '';
    if (name_fa === null || isUndefined(name_fa))
      name_fa = '';
    name = name.trim();
    name_fa = name_fa.trim();
    if ((!name || name === '') || (!name_fa || name_fa === '')) {
      if (!name || name === '') {
        Ac.get('name').setErrors({beingNull: 'Name can not be null.'});
      }
      if (!name_fa || name_fa === '') {
        Ac.get('name_fa').setErrors({beingNull: 'name_fa can not be null.'});
      }
    } else {
      Ac.get('name').setErrors(null);
      return null;
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
      }
      else
        resolve(true);
    });
  }
  // ngOnInit() {
  //   this.route.params.subscribe(
  //     (params) => {
  //       this.personId = +params['id'] ? +params['id'] : null;
  //
  //       if (this.personId) {
  //         this.breadcrumbService.pushChild(`User's Expertise`, this.router.url, false);
  //         this.getUserExpertise();
  //       }
  //     },
  //     (err) => console.error('Cannot parse params')
  //   );
  // }
  //
  // getUserExpertise() {
  //   if (!this.personId)
  //     return;
  //
  //   this.restService.get('user/' + this.personId + '/expertise').subscribe(
  //     (data) => {
  //       let counter = 0;
  //
  //       this.userExpertiseList = [];
  //       data.forEach(el => {
  //         this.userExpertiseList.push({
  //           position: ++counter,
  //           name_en: el.name_en,
  //           name_fa: el.name_fa,
  //           peid: el.peid,
  //           expertise_id: el.expertise_id,
  //         });
  //       });
  //
  //       this.currentExpertiseIds = this.userExpertiseList.map(el => el.expertise_id);
  //     },
  //     (err) => console.error(`Cannot get user's expertise. Error: `, err)
  //   );
  // }
  //
  // removePersonExpertise(id) {
  //   const rmDialog = this.dialog.open(RemovingConfirmComponent);
  //
  //   rmDialog.afterClosed().subscribe(
  //     (data) => {
  //       if (data) {
  //         this.restService.delete('expertise/' + this.personId + '/' + id).subscribe(
  //           (dt) => {
  //             this.snackBar.open(`Person's expertise is deleted successfully`, null, {
  //               duration: 2300,
  //             });
  //
  //             this.userExpertiseList = this.userExpertiseList.filter(el => el.expertise_id !== id);
  //             this.currentExpertiseIds = this.currentExpertiseIds.filter(el => el !== id);
  //           },
  //           (error) => {
  //             this.snackBar.open(`Cannot delete this person's expertise. Please try again`, null, {
  //               duration: 3200,
  //             });
  //           }
  //         );
  //       }
  //     },
  //     (err) => console.error('Error in dialog: ', err)
  //   );
  // }
  //
  // addExpertise(expObj) {
  //   console.log('=====>expOBj: ', expObj);
  //
  //   this.restService.get('expertise/' + expObj.expertise_id).subscribe(
  //     (expData) => {
  //       this.restService.post('user/expertise', {
  //         pid: this.personId,
  //         expertise: {expertise_id: expObj.expertise_id},
  //       }).subscribe(
  //         (data) => {
  //           this.userExpertiseList.push({
  //             position: this.userExpertiseList.length + 1,
  //             name_en: expData[0].name_en,
  //             name_fa: expData[0].name_fa,
  //             expertise_id: expData[0].expertise_id,
  //             peid: data.peid,
  //           });
  //
  //           this.currentExpertiseIds.push(expData[0].expertise_id);
  //
  //           this.snackBar.open('Expertise is added to this person', null, {
  //             duration: 2300,
  //           });
  //         },
  //         (err) => {
  //           console.error('Cannot add expertise. Error: ', err);
  //           this.snackBar.open('Cannot add this expertise. Please try again', null, {
  //             duration: 3200,
  //           });
  //         }
  //       );
  //     },
  //     (err) => console.error('Cannot get expertise details. Error: ', err)
  //   );
  // }
}
