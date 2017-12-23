import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../shared/services/rest.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RemovingConfirmComponent} from '../../../shared/components/removing-confirm/removing-confirm.component';
import {BreadcrumbService} from '../../../shared/services/breadcrumb.service';

@Component({
  selector: 'ii-expertise-form',
  templateUrl: './expertise-form.component.html',
  styleUrls: ['./expertise-form.component.css']
})
export class ExpertiseFormComponent implements OnInit {
  userExpertiseList = [];
  personId: number = null;
  currentExpertiseIds: number[] = [];

  constructor(private route: ActivatedRoute, private restService: RestService,
              private snackBar: MatSnackBar, private breadcrumbService: BreadcrumbService,
              private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.personId = +params['id'] ? +params['id'] : null;

        if (this.personId) {
          this.breadcrumbService.pushChild(`User's Expertise`, this.router.url, false);
          this.getUserExpertise();
        }
      },
      (err) => console.error('Cannot parse params')
    );
  }

  getUserExpertise() {
    if (!this.personId)
      return;

    this.restService.get('user/' + this.personId + '/expertise').subscribe(
      (data) => {
        let counter = 0;

        this.userExpertiseList = [];
        data.forEach(el => {
          this.userExpertiseList.push({
            position: ++counter,
            name_en: el.name_en,
            name_fa: el.name_fa,
            peid: el.peid,
            expertise_id: el.expertise_id,
          });
        });

        this.currentExpertiseIds = this.userExpertiseList.map(el => el.expertise_id);
      },
      (err) => console.error(`Cannot get user's expertise. Error: `, err)
    );
  }

  removePersonExpertise(id) {
    const rmDialog = this.dialog.open(RemovingConfirmComponent);

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.restService.delete('expertise/' + this.personId + '/' + id).subscribe(
            (dt) => {
              this.snackBar.open(`Person's expertise is deleted successfully`, null, {
                duration: 2300,
              });

              this.userExpertiseList = this.userExpertiseList.filter(el => el.expertise_id !== id);
              this.currentExpertiseIds = this.currentExpertiseIds.filter(el => el !== id);
            },
            (error) => {
              this.snackBar.open(`Cannot delete this person's expertise. Please try again`, null, {
                duration: 3200,
              });
            }
          );
        }
      },
      (err) => console.error('Error in dialog: ', err)
    );
  }

  addExpertise(expObj) {
    this.restService.get('expertise/' + expObj.expertise_id).subscribe(
      (expData) => {
        this.restService.post('user/expertise', {
          pid: this.personId,
          expertise: {expertise_id: expObj.expertise_id},
        }).subscribe(
          (data) => {
            this.userExpertiseList.push({
              position: this.userExpertiseList.length + 1,
              name_en: expData[0].name_en,
              name_fa: expData[0].name_fa,
              expertise_id: expData[0].expertise_id,
              peid: data.peid,
            });

            this.currentExpertiseIds.push(expData[0].expertise_id);

            this.snackBar.open('Expertise is added to this person', null, {
              duration: 2300,
            });
          },
          (err) => {
            console.error('Cannot add expertise. Error: ', err);
            this.snackBar.open('Cannot add this expertise. Please try again', null, {
              duration: 3200,
            });
          }
        );
      },
      (err) => console.error('Cannot get expertise details. Error: ', err)
    );
  }
}
