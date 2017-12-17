import { Component, OnInit } from '@angular/core';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ActionEnum} from '../../../../shared/enum/action.enum';
import {RestService} from '../../../../shared/services/rest.service';
import {IMember} from '../../interfaces/member';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';

@Component({
  selector: 'ii-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css']
})
export class BusinessInfoComponent implements OnInit {

  bid: number;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.bid = +params['bid'];
      this.breadCrumbService.pushChild(this.bid ? 'Update' : 'Add', this.router.url, false);
      this.progressService.enable();
      this.restService.get(`joiners/biz/${this.bid}`).subscribe(res => {

        this.progressService.disable();
      }, err => {
        this.progressService.disable();

      });

    });

  }

}
