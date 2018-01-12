import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {RestService} from '../../../../shared/services/rest.service';
import {typeInsertSuccessful, typeUpdateSuccessful} from '../../../../shared/utils/messages.list';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IType} from '../../interfaces/type.interface';
import {TargetEnum} from '../../../../shared/enum/target.enum';
import {ProgressService} from '../../../../shared/services/progress.service';
import {AbstractFormComponent} from '../../../../shared/components/abstract-form/abstract-form.component';
import {Params} from '@angular/router';


@Component({
  selector: 'ii-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent extends AbstractFormComponent implements OnInit{

  typeName: string;

  has_killer = false;
  cats: string[] = [];
  form: FormGroup;

  ngOnInit() {

    this.viewName = 'Partnership';
    super.ngOnInit();
    this.initForm();

    this.route.params.subscribe((params: Params) => {
      this.typeName = decodeURIComponent(params['personName']);
      this.initType();

    });

    this.restService.get('type/getCats').subscribe(res => {
      this.cats = res.map(r => TargetEnum[r] ? TargetEnum[r] : r.charAt(0).toUpperCase() + r.slice(1));
    });

  }

  initForm() {
    this.form = new FormBuilder().group({
      name: ['', Validators.required],
      name_fa: ['', Validators.required],
      type_name: [{value: '', disabled: !!this.formId}, Validators.required],
      suggested_by: [''],
      active: [false],
      is_killer: [false]

    });
    super.initForm();
  }

  initType() {

    if (!this.formId) {
      return;
    }

    this.form.controls.type_name.setValue(this.typeName);

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    this.restService.get(`type/${this.typeName}_type/${this.formId}`).subscribe(
      (res) => {

        this.originalForm = res[0];

        if (this.typeName === 'lce')
          this.has_killer = true;

        const result = res[0];
        this.form.controls.name.setValue(result.name);
        this.form.controls.name_fa.setValue(result.name_fa);
        this.form.controls.suggested_by.setValue(result.username);
        this.form.controls.is_killer.setValue(result.is_killer);
        this.form.controls.active.setValue(result.active);

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

  modifyType() {

    const typeData: any = {
      id: this.formId,
      name: this.form.controls['name'].value,
      name_fa: this.form.controls['name_fa'].value,
      is_killer: this.form.controls['suggested_by'].value,
      active: this.form.controls['is_confirmed'].value
    };

    if (!this.typeName)
      this.typeName = this.form.value.type_name.toLowerCase();

    if (this.typeName === 'lce')
      typeData.is_killer = !!this.form.value.is_killer;

    if (!this.formId)
      delete typeData.id;

    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    const rest = this.formId ?
      this.restService.put(`type/${this.typeName}_type/${this.formId}`, typeData) : // update
      this.restService.post(`type/${this.typeName}_type`, typeData); // insert

    rest.subscribe(
      (data) => {
        this.snackBar.open(this.formId ? typeUpdateSuccessful.message : typeInsertSuccessful.message);

        this.anyChanges = false;

        if (!this.formId) {
          this.form.reset();
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

  onChange(cat) {
    this.has_killer = cat.toLowerCase() === 'lce';
  }

}
