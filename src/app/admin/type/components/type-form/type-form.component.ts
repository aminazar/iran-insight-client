import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {RestService} from '../../../../shared/services/rest.service';
import {illegalTypeName, noType, typeInsertSuccessful, typeUpdateSuccessful} from '../../../../shared/utils/messages.list';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IType} from '../../interfaces/type.interface';


@Component({
  selector: 'ii-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {

  type_name: string;
  typeId: number;
  has_killer = false;
  cats: string[] = [];
  form: FormGroup;


  constructor(public dialogRef: MatDialogRef<TypeFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  restService: RestService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {

  }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      name_fa: ['', [
        Validators.required,
      ]],
      type_name: ['', [
        Validators.required,
      ]],
      suggested_by: [''],
      active: [false],
      is_killer: [false]

    });

    this.restService.get('type/getCats').subscribe(res => {
      this.cats = res;
    });

    this.typeId = this.data.id;
    this.type_name = this.data.type_name;

    if (this.typeId) {

      this.form.controls.type_name.setValue(this.type_name);

      this.restService.get(`type/${this.type_name}_type/${this.typeId}`).subscribe(res => {

        if (this.type_name === 'lce')
          this.has_killer = true;

        const result = res[0];
        this.form.controls.name.setValue(result.name);
        this.form.controls.name_fa.setValue(result.name_fa);
        this.form.controls.suggested_by.setValue(result.suggested_by);
        this.form.controls.is_killer.setValue(result.is_killer);
        this.form.controls.active.setValue(result.active);

      });

    }
  }

  onSubmit() {

    if (this.form.valid) {
      const body: any = {
        name: this.form.value.name,
        name_fa: this.form.value.name_fa,
        active: this.form.value.active,
      };


      if (!this.type_name)
        this.type_name = this.form.value.type_name;

      if (this.type_name === 'lce')
        body.is_killer = this.form.value.is_killer;

      const rest = this.typeId ?
        this.restService.put(`type/${this.type_name}_type/${this.typeId}`, body) : // update
        this.restService.post(`type/${this.type_name}_type`, body); // insert

      rest.subscribe(res => {

        this.dialogRef.close(<IType>{
          id: res.body.id,
          type_name: this.form.value.type_name,
          name: this.form.value.name,
          name_fa: this.form.value.name_fa,
          active: this.form.value.active,
        });

        this.showMessage(null, this.typeId ? typeUpdateSuccessful.message : typeInsertSuccessful.message);

      }, err => {
        this.showMessage(err);
      });
    }
  }

  onChange(cat) {
    this.has_killer = cat === 'lce';
  }

  onCancel() {
    this.dialogRef.close();
  }


  showMessage(err: any = null, message: string = null) {

    if (err) {
      if (err.error === illegalTypeName.error.message && err.status === illegalTypeName.code)
        this.snackBar.open(illegalTypeName.friendlyMessage);
      else if (err.error === noType.error.message && err.status === noType.code)
        this.snackBar.open(noType.friendlyMessage);
      else
        this.snackBar.open('operation failed!');

      return;
    }

    if (message)
      this.snackBar.open(message);
  }

  ngOnDestroy() {
    this.type_name = null;
    this.typeId = null;
  }

}
