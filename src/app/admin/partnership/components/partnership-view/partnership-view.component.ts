import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';
import {RestService} from '../../../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {ProgressService} from '../../../../shared/services/progress.service';
import {IPartnership} from '../../interfaces/partnership.interface';


@Component({
  selector: 'ii-partnership-view',
  templateUrl: './partnership-view.component.html',
  styleUrls: ['./partnership-view.component.css']
})
export class PartnershipViewComponent implements OnInit {

  personId: number;
  personName: string;

  formId: number;

  partnership: IPartnership;

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

      this.personId = params['id'];
      this.formId = params['formId'];
      this.personName = decodeURIComponent(params['personName']);
      this.initPartnership();

    });
  }

  initPartnership() {

    this.progressService.enable();

    this.restService.get(`person/partnership/${this.formId}`).subscribe(
      (res) => {

        console.log('-> ', res);
        this.partnership = res[0];

        this.progressService.disable();
      },
      (err) => {
        console.error(err);
        this.progressService.disable();
      }
    );
  }





  deletePartnership() {

    if (!this.formId)
      return;

    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(res => {

      if (res) {

        this.progressService.enable();
        this.restService.delete(`person/partnership/${this.formId}`).subscribe(data => {

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
