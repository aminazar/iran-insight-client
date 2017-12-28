import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RestService} from '../../../../shared/services/rest.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';

@Component({
  selector: 'ii-business-view',
  templateUrl: './business-view.component.html',
  styleUrls: ['./business-view.component.css']
})
export class BusinessViewComponent implements OnInit, OnDestroy {
  bid: number;
  data: any = {};
  parsed = '';

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any, private router: Router,
              private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService, private activatedRoute: ActivatedRoute,
              private restService: RestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.bid = +params['bid'];
      if (this.bid) {
        this.breadCrumbService.pushChild('View', this.router.url, false);
      } else { // Opens as dialog
        this.bid = this.dialogData.bid;
      }
      this.progressService.enable();
      this.restService.get(`business/oneAll/${this.bid}`).subscribe(res => {
        this.data = res;
        this.parsed = JSON.stringify(res, null, 2);
        this.progressService.disable();
      }, err => {
        this.progressService.disable();

      });
      this.progressService.enable();
    });

  }

  ngOnDestroy() {
  }
}
