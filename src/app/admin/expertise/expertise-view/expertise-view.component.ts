import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../../shared/services/breadcrumb.service';
import {ProgressService} from '../../../shared/services/progress.service';
import {AuthService} from '../../../shared/services/auth.service';
import {expertiseRouting} from '../expertise.routing';
import {MatSnackBar} from '@angular/material';

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
              private authService: AuthService, private snackBar: MatSnackBar) {
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
    // TODO: edit expertise
  }

  deleteExpertise() {
    // TODO: delete expertise
  }

}
