import {Component, Input, OnInit} from '@angular/core';
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
export class PersonExpertiseComponent implements OnInit {
  @Input() personId: number = null;

  expertiseCtrl: FormControl;
  filteredExpertise: Observable<any[]>;
  expertiseList = [];
  expertiseNameList = [];
  userExpertiseList: PersonExpertiseInterface[] = [];

  constructor(private restService: RestService, public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllExpertise();
    this.getUserExpertise();

    this.expertiseCtrl = new FormControl();
    this.filteredExpertise = this.expertiseCtrl.valueChanges
      .pipe(
        startWith(''),
        map(exp => exp ? this.filterExpertise(exp) : this.expertiseNameList)
      );
  }

  getAllExpertise() {
    this.restService.get('expertise').subscribe(
      (data) => {
        this.expertiseList = data;
        this.expertiseNameList = this.expertiseList.map(el => {
          if (el.name_en && el.name_fa)
            return el.name_en + ' - ' + el.name_fa;
          else if (el.name_en && !el.name_fa)
            return el.name_en;
          else if (!el.name_en && el.name_fa)
            return el.name_fa;
        });

        this.remainDiff();
      },
      (err) => {
        console.error(err);
        this.expertiseList = [];
      }
    );
  }

  getUserExpertise() {
    if (!this.personId)
      return;

    this.restService.get('user/' + this.personId + '/expertise').subscribe(
      (data) => {
        let counter = 0;
        data.forEach(el => {
          this.userExpertiseList.push({
            position: ++counter,
            name_en: el.name_en,
            name_fa: el.name_fa,
            peid: el.peid,
            expertise_id: el.expertise_id,
          });
        });

        this.remainDiff();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  filterExpertise(name: string) {
    if(name.includes('\\'))
      return;

    return this.expertiseNameList.filter((p) => new RegExp(name, 'gi').test(p));
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
              this.expertiseNameList.push(item.name_en + ' - ' + item.name_fa);
              this.userExpertiseList = this.userExpertiseList.filter(el => el.expertise_id !== id);
              this.expertiseCtrl.setValue('');
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

  addExpertise(expertise_name) {
    let exp = this.expertiseList.find(el => (el.name_en + ' - ' + el.name_fa) === expertise_name);

    this.restService.post('user/expertise', {
      pid: this.personId,
      expertise: exp,
    }).subscribe(
      (data) => {
        this.userExpertiseList.push({
          position: this.userExpertiseList.length + 1,
          name_en: exp.name_en,
          name_fa: exp.name_fa,
          expertise_id: exp.expertise_id,
          peid: data.peid,
        });

        this.snackBar.open('Expertise was added to this person', null, {
          duration: 2300,
        });

        this.expertiseNameList = this.expertiseNameList.filter(el =>  el !== expertise_name);
        this.expertiseCtrl.setValue('');
      },
      (err) => {
        console.error('Cannot add expertise: ', err);
        this.snackBar.open('Cannot add this expertise. Please try again', null, {
          duration: 3000,
        });
      }
    )
  }

  remainDiff() {
    if (!this.userExpertiseList.length || !this.expertiseNameList.length)
      return;

    this.expertiseNameList = this.expertiseNameList.filter(el => {
      if(!this.userExpertiseList.map(i => i.name_en + ' - ' + i.name_fa).includes(el)){
        return el;
      }
    });
  }
}
