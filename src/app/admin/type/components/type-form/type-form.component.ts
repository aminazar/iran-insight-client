import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {RestService} from '../../../../shared/services/rest.service';
import {typeInsertSuccessful, typeUpdateSuccessful} from '../../../../shared/utils/messages.list';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IType} from '../../interfaces/type.interface';
import {TargetEnum} from '../../../../shared/enum/target.enum';
import {ProgressService} from '../../../../shared/services/progress.service';


@Component({
  selector: 'ii-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit, OnDestroy {

  type_name: string;
  typeId: number;
  has_killer = false;
  cats: string[] = [];
  form: FormGroup;
  canSubmit = true; // it is only false when submit button is pressed and waiting for response


  constructor(public dialogRef: MatDialogRef<TypeFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  restService: RestService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private prgService: ProgressService) {

  }

  ngOnInit() {
    this.typeId = this.data.id;
    this.type_name = this.data.type_name;

    this.form = this.fb.group({
      name: ['', Validators.required],
      name_fa: ['', Validators.required],
      type_name: [{value: '', disabled: !!this.typeId}, Validators.required],
      suggested_by: [''],
      active: [false],
      is_killer: [false]

    });

    this.restService.get('type/getCats').subscribe(res => {
      this.cats = res;
    });

    if (this.typeId) {

      this.form.controls.type_name.setValue(this.type_name);

      this.prgService.enable();
      this.restService.get(`type/${this.type_name}_type/${this.typeId}`).subscribe(res => {

        this.prgService.disable();

        if (this.type_name === 'lce')
          this.has_killer = true;

        const result = res[0];
        this.form.controls.name.setValue(result.name);
        this.form.controls.name_fa.setValue(result.name_fa);
        this.form.controls.suggested_by.setValue(result.username);
        this.form.controls.is_killer.setValue(result.is_killer);
        this.form.controls.active.setValue(result.active);

      });

    }
  }

  onSubmit() {

    if (this.form.valid) {

      this.canSubmit = false;

      const body: any = {
        name: this.form.value.name,
        name_fa: this.form.value.name_fa,
        active: !!this.form.value.active,
      };


      if (!this.type_name)
        this.type_name = this.form.value.type_name;

      if (this.type_name === 'lce')
        body.is_killer = !!this.form.value.is_killer;

      const rest = this.typeId ?
        this.restService.put(`type/${this.type_name}_type/${this.typeId}`, body) : // update
        this.restService.post(`type/${this.type_name}_type`, body); // insert

      this.prgService.enable();

      rest.subscribe(res => {

        this.canSubmit = true;

        this.prgService.disable();

        this.snackBar.open(this.typeId ? typeUpdateSuccessful.message : typeInsertSuccessful.message);

        this.dialogRef.close(<IType>{
          id: res.id,
          type_name: this.form.value.type_name,
          name: this.form.value.name,
          name_fa: this.form.value.name_fa,
          active: this.form.value.active,
        });


      }, err => {
        this.canSubmit = true;
        this.prgService.disable();

      });
    }
  }

  onChange(cat) {
    this.has_killer = cat === 'lce';
  }

  onCancel() {
    this.dialogRef.close();
  }


  ngOnDestroy() {
    this.type_name = null;
    this.typeId = null;
    this.form = null;
    this.has_killer = false;
    this.cats = [];
  }

}
