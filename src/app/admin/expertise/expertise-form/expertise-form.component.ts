import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ii-expertise-form',
  templateUrl: './expertise-form.component.html',
  styleUrls: ['./expertise-form.component.css']
})
export class ExpertiseFormComponent implements OnInit {
  expertiseForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.expertiseForm = new FormBuilder().group({
      name_en: [null, [
        Validators.required
      ]],
      name_fa: [null, [
        Validators.required,
      ]],
      is_education: [null, [
        Validators.required
      ]]
    });
  }

  modifyExpertise(){

  }
}
