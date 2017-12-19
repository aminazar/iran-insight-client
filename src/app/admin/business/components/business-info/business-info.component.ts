import { Component, OnInit } from '@angular/core';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {RestService} from '../../../../shared/services/rest.service';
import {IMember} from '../../interfaces/member';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ii-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css']
})
export class BusinessInfoComponent implements OnInit {

  bid: number;
  add = false;
  form;
  loadedValue: any = {};

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.bid = +params['bid'];
      this.add = !!this.bid;
      this.breadCrumbService.pushChild(this.add ? 'Add' : 'Update', this.router.url, false);
      this.progressService.enable();

      if (!this.add) {
        this.restService.get(`business/one/${this.bid}`).subscribe(res => {
          this.loadedValue = res;
          this.initForm();
          this.progressService.disable();
        }, err => {
          this.progressService.disable();

        });
      } else {
        this.initForm();
      }
    });

  }

  ngOnDestroy() {
    this.form = null;
  }

  initForm() {
    this.form = new FormBuilder().group({
      name_en: [this.loadedValue.name, [Validators.required]],
      name_fa: [this.loadedValue.name_fa],
      address_en: [this.loadedValue.address, [
        Validators.maxLength(500),
        Validators.required,
      ]],
      address_fa: [this.loadedValue.address_fa, [
        Validators.maxLength(500),
      ]],
      tel: [this.loadedValue.tel, [
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{0,8}$/),
        Validators.required,
      ]],
      url: [this.loadedValue.url, [
        Validators.pattern(/(http|https):\/\/[^ "]+$/),
        Validators.required,
      ]],
    });
  }

}
