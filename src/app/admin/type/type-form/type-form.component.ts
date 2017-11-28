import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms/forms';
import {RestService} from '../../../shared/services/rest.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ii-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {

  typeId: number;
  name: string;
  name_fa: string;
  suggested_by: string = 'Admin';
  is_killer: boolean = false;
  has_killer: boolean = false;
  is_active: boolean = false;

  cats: string[] = [];
  cat: string;

  constructor(public dialogRef: MatDialogRef<TypeFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  restService: RestService) {

  }

  ngOnInit() {
    this.restService.get('type/getCats').subscribe(res => {
      this.cats = res;
    });

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onChange(cat) {
    this.has_killer = cat === 'lce';
  }

  ngOnDestroy() {
  }

}
