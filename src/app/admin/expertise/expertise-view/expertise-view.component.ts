import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../shared/services/breadcrumb.service';
import {ProgressService} from '../../../shared/services/progress.service';
import {AuthService} from '../../../shared/services/auth.service';
import {expertiseRouting} from '../expertise.routing';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RemovingConfirmComponent} from '../../../shared/components/removing-confirm/removing-confirm.component';
import {RestService} from '../../../shared/services/rest.service';

@Component({
  selector: 'ii-expertise-view',
  templateUrl: './expertise-view.component.html',
  styleUrls: ['./expertise-view.component.css']
})
export class ExpertiseViewComponent implements OnInit {
  expertiseId: number = null;
  expertise: any = null;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
              private router: Router, private progressService: ProgressService,
              private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog, private restService: RestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.expertiseId = +params['id'] ? +params['id'] : null;
        if (this.expertiseId) {
          this.breadcrumbService.pushChild('Expertise Details', this.router.url, false);

          this.progressService.enable();
          this.authService.getExpertiseInfo(this.expertiseId).subscribe(
            (data) => {
              this.expertise = data[0];
              this.progressService.disable();
            },
            (err) => {
              this.progressService.disable();
              console.log('Cannot get Expertise info. Error: ', err);
            }
          );
        }
      }
    );
  }

  editExpertise() {
    this.router.navigate([`/admin/expertise/form/${this.expertiseId}`]);
  }

  deleteExpertise() {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.progressService.enable();
          this.restService.delete(`/expertise/${this.expertiseId}`).subscribe(
            (dt) => {
              this.snackBar.open(`Expertise delete successfully`, null, {
                duration: 2000,
              });
              this.progressService.disable();

              this.breadcrumbService.popChild();
            },
            (error) => {
              this.snackBar.open(`Cannot delete this expertise. Please try again`, null, {
                duration: 2700
              });
              this.progressService.disable();
            }
          );
        }
      },
      (err) => {
        console.error('Error in dialog: ', err);
      }
    );
  }

}
