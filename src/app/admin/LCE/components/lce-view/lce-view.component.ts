import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {RestService} from '../../../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ILCE} from '../../interfaces/lce.interface';

enum LCEType {
  ORG = 'organization',
  BIZ = 'business'
}


@Component({
  selector: 'ii-lce-view',
  templateUrl: './lce-view.component.html',
  styleUrls: ['./lce-view.component.css']
})
export class LceViewComponent implements OnInit {

  companyType: string; // company is org or biz
  companyId: number;
  companyName: string;
  companyKey: string;

  formId: number;

  lce: ILCE;

  constructor(private router: Router,
              private restService: RestService,
              private dialog: MatDialog,
              private breadcrumbService: BreadcrumbService,
              private route: ActivatedRoute,
              private progressService: ProgressService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      this.companyType = this.router.url.split('/')[2];
      this.companyId = params['id'];
      this.formId = params['formId'];
      this.companyName = decodeURIComponent(params['companyName']);
      this.initLCE();

    });
    this.companyKey = this.companyType === LCEType.BIZ ? 'bid' : 'oid';

  }

  initLCE() {

    this.progressService.enable();

    this.restService.get(`lce/${this.companyType}/${this.companyId}/${this.formId}`).subscribe(
      (res) => {


        this.lce = res[0];

        this.progressService.disable();
      },
      (err) => {
        console.error(err);
        this.snackBar.open('Cannot get life cycle event details. Please try again', null, {
          duration: 3200,
        });
        this.progressService.disable();
      }
    );
  }





  deleteLCE() {

    if (!this.formId)
      return;

    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(res => {

      if (res) {

        this.progressService.enable();
        this.restService.delete(`lce/${this.companyType}/${this.formId}`).subscribe(data => {

          this.progressService.disable();
          this.snackBar.open('life cycle event has been deleted', null, {
            duration: 3200,
          });
          this.breadcrumbService.popChild();

        }, err => {
          this.progressService.disable();
        });
      }
    }, err => {

    });
  }

}
