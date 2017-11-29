import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {NgForm} from '@angular/forms/forms';
import {RestService} from '../../../shared/services/rest.service';
import {illegalTypeName, noType, typeInsertSuccessful, typeUpdateSuccessful} from '../../../shared/utils/messages.list';

@Component({
  selector: 'ii-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {

  typeId: number;
  name: string;
  name_fa: string;
  suggested_by: string = '';
  is_killer: boolean = false;
  has_killer: boolean = false;
  active: boolean = false;

  cats: string[] = [];
  cat: string;

  constructor(public dialogRef: MatDialogRef<TypeFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  restService: RestService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {


    this.restService.get('type/getCats').subscribe(res => {
      this.cats = res;
    });

    this.typeId = this.data.id;
    if (this.typeId) {

      this.restService.get('type/lce_type/1').subscribe(res => {
        this.cat = res.type_name.replace('_type', '');
        if (this.cat === 'lce')
          this.has_killer = true;

        this.name = res.name;
        this.name_fa = res.name_fa;
        this.suggested_by = res.username;
        this.is_killer = res.is_killer;
        this.active = res.active;

      });

    }
  }

  onSubmit(form: NgForm) {


    let body = Object.assign({}, form.value);
    delete body.cat;


    let rest = this.typeId ?
      this.restService.put(`type/${this.cat}_type/${this.typeId}`, body) : // update
      this.restService.post(`type/${this.cat}_type`, body); // insert

    rest.subscribe(res => {
      this.showMessage(null ,this.typeId ? typeUpdateSuccessful.message : typeInsertSuccessful.message );

    }, err => {
      this.showMessage(err);
    });
  }

  onChange(cat) {
    this.has_killer = cat === 'lce';
  }

  onCancel() {
    this.dialogRef.close();
  }


  showMessage(err: any  = null, message: string = null){

    if (err){
      if (err.error === illegalTypeName.error.message && err.status === illegalTypeName.code)
        this.snackBar.open(illegalTypeName.friendlyMessage);
      else if (err.error === noType.error.message && err.status === noType.code)
        this.snackBar.open(noType.friendlyMessage);
      else
        this.snackBar.open('operation failed!');

      return;
    }

    if(message)
    this.snackBar.open(message);
  }

  ngOnDestroy() {
  }

}
