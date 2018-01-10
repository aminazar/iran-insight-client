import {Component, OnInit} from '@angular/core';
import {ProgressService} from '../../../../shared/services/progress.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {RestService} from '../../../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RemovingConfirmComponent} from '../../../../shared/components/removing-confirm/removing-confirm.component';

@Component({
  selector: 'ii-consultancy-view',
  templateUrl: './consultancy-view.component.html',
  styleUrls: ['./consultancy-view.component.css']
})
export class ConsultancyViewComponent implements OnInit {
  consultancyId: number = null;
  id: number = null;
  type = null;
  isConsulting = false;
  consultancy: any = null;

  constructor(private progressService: ProgressService, private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService, private router: Router,
              private restService: RestService, public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.consultancyId = +params['cnsid'] ? +params['cnsid'] : null;
        this.id = +params['id'] ? +params['id'] : null;
        this.type = params['type'] ? params['type'] : null;
        this.isConsulting = params['is_consulting'] ? (params['is_consulting'] === 'true' ? true : false) : false;
        if (this.consultancyId) {
          this.breadcrumbService.pushChild('Consultancy Details', this.router.url, false);
          this.progressService.enable();

          this.restService.get('consultancy/' + this.consultancyId).subscribe(
            (data) => {
              this.consultancy = data;
              this.progressService.disable();
            },
            (err) => {
              this.progressService.disable();
              console.error('Cannot get consultancy info. Error: ', err);
            }
          );
        }
      }
    );
  }

  editConsultancy() {
    if (this.consultancy)
      this.router.navigate(['/admin/consultancy/form' +
      (this.type ? `/${this.type}` : '') + '/' + this.isConsulting + '/' + this.id + '/' + this.consultancyId]);
  }

  deleteConsultancy() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (dt) => {
        if (dt)
          this.restService.delete('consultancy/' +  this.consultancyId).subscribe(
            (data) => this.breadcrumbService.popChild(),
            (err) => console.error('Cannot delete Consultancy')
          );
      },
      (err) => console.error('An error occurred when subscribing on afterClosed dialog method: ', err)
    );
  }
}
