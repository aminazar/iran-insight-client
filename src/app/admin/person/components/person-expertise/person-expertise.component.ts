import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {startWith} from "rxjs/operators/startWith";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators/map";
import {RestService} from "../../../../shared/services/rest.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {PersonExpertiseInterface} from "../../interfaces/personExpertise.interface";
import {RemovingConfirmComponent} from "../../../../shared/components/removing-confirm/removing-confirm.component";

@Component({
  selector: 'ii-person-expertise',
  templateUrl: './person-expertise.component.html',
  styleUrls: ['./person-expertise.component.css']
})
export class PersonExpertiseComponent implements OnInit, OnDestroy {
  @Input()
  set personId(id) {
    this._personId = id;
    this.getUserExpertise();
  }

  get personId() {
    return this._personId;
  }

  userExpertiseList: PersonExpertiseInterface[] = [];
  _personId: number = null;
  currentExpertiseIds: number[] = [];

  constructor(private restService: RestService, public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUserExpertise();
  }

  ngOnDestroy() {
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
      (err) => {
        console.error(err);
      }
    );
  }

  removePersonExpertise(id) {
    let rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '330px',
      height: '230px'
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.restService.delete('expertise/' + this.personId + '/' + id).subscribe(
            (data) => {
              this.snackBar.open("Person's expertise delete successfully", null, {
                duration: 2000,
              });

              let item = this.userExpertiseList.find(el => el.expertise_id === id);
              this.userExpertiseList = this.userExpertiseList.filter(el => el.expertise_id !== id);
              this.currentExpertiseIds = this.currentExpertiseIds.filter(el => el != id);
            },
            (error) => {
              this.snackBar.open("Cannot delete this person's expertise. Please try again", null, {
                duration: 2700
              });
            }
          )
        }
      },
      (err) => {
        console.error('Error in dialog: ', err);
      }
    )
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

            this.snackBar.open('Expertise was added to this person', null, {
              duration: 2300,
            });
          },
          (err) => {
            console.error('Cannot add expertise: ', err);
            this.snackBar.open('Cannot add this expertise. Please try again', null, {
              duration: 3000,
            });
          }
        )
      },
      (err) => {
        console.log('Cannot get expertise details. Error: ', err);
      }
    )
  }
}
