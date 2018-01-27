import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {typeInsertSuccessful, typeUpdateSuccessful} from '../../../../shared/utils/messages.list';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractFormComponent} from '../../../../shared/components/abstract-form/abstract-form.component';
import {Params} from '@angular/router';


@Component({
  selector: 'ii-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent extends AbstractFormComponent implements OnInit {
  typeName: string;
  typeId: number;
  has_killer = false;
  cats = [];
  form: FormGroup;
  isAdd = false;

  ngOnInit() {
    this.viewName = 'type';
    super.ngOnInit();
    this.initForm();

    this.route.params.subscribe((params: Params) => {
      this.typeName = (params['typeName'] != 'undefined' && params['typeName'] != 'null') ? params['typeName'] : null;
      this.typeId = (params['formId'] != 'undefined' && params['formId'] != 'null') ? +params['formId'] : null;
      this.isAdd = (!this.typeName && !this.typeId);

      if ((!this.typeName && this.typeId) || (this.typeName && !this.typeId))
        this.snackBar.open('The url parameters is not set correctly', null, {
          duration: 3200,
        });

      this.initType();
    });

    this.restService.get('type/getCats').subscribe(res => {
      this.cats = [];
      this.cats = res.map(r => {
        return {value: r, name: r.charAt(0).toUpperCase() + r.slice(1)};
      });
    });

  }

  initForm() {
    this.form = new FormBuilder().group({
      name: [null, Validators.required],
      name_fa: [null, Validators.required],
      // type_name: [{value: this.isAdd ? '' : this.typeName, disabled: !!this.formId}, Validators.required],
      type_name: [this.isAdd ? '' : this.typeName, [Validators.required]],
      suggested_by: [null],
      active: [false],
      is_killer: [false]

    });
    super.initForm();
  }

  initType() {
    if (!this.formId) {
      return;
    }

    this.form.controls['type_name'].setValue(this.typeName);
    this.progressService.enable();
    this.upsertBtnShouldDisabled = true;
    this.deleteBtnShouldDisabled = true;

    this.restService.get(`type/${this.typeName}_type/${this.formId}`).subscribe(
      (res) => {
        this.originalForm = res[0];
        this.originalForm.suggested_by_id = this.originalForm.suggested_by;
        this.originalForm.suggested_by = this.originalForm.person_display_name || this.originalForm.person_display_name_fa;
        this.originalForm.type_name = this.typeName;

        if (this.typeName === 'lce')
          this.has_killer = true;

        const result = res[0];
        this.form.controls.name.setValue(result.name);
        this.form.controls.name_fa.setValue(result.name_fa);
        this.form.controls.suggested_by.setValue(result.person_display_name || result.person_display_name_fa);
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
      active: this.form.controls['active'].value
    };

    if (!this.typeName)
      this.typeName = this.form.value.type_name.toLowerCase();

    if (this.typeName === 'lce')
      typeData.is_killer = this.form.value.is_killer;

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
          this.formId = data.id;
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

  fieldChanged() {
    if (!this.originalForm)
      return;

    this.anyChanges = false;

    Object.keys(this.form.controls).forEach(el => {
      let formValue = this.form.controls[el].value;
      let originalValue = this.originalForm[el];

      if (typeof formValue === 'string')
        if (formValue && formValue.trim().length <= 0)
          formValue = null;
        else if (formValue)
          formValue = formValue.trim();

      if (typeof originalValue === 'string')
        if (originalValue && originalValue.trim().length <= 0)
          originalValue = null;
        else if (originalValue)
          originalValue = originalValue.trim();

      if (formValue !== originalValue && (formValue !== '' || originalValue !== null))
        this.anyChanges = true;
    });
  }
}
