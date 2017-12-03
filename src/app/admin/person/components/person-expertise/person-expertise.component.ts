import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {startWith} from "rxjs/operators/startWith";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators/map";
import {RestService} from "../../../../shared/services/rest.service";

@Component({
  selector: 'ii-person-expertise',
  templateUrl: './person-expertise.component.html',
  styleUrls: ['./person-expertise.component.css']
})
export class PersonExpertiseComponent implements OnInit {
  personId: number = null;
  expertiseCtrl: FormControl;
  filteredExpertise: Observable<any[]>;
  expertiseList = [];
  userExpertiseList = [];

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.getAllExpertise();
    this.getUserExpertise();

    this.expertiseCtrl = new FormControl();
    this.filteredExpertise = this.expertiseCtrl.valueChanges
      .pipe(
        startWith(''),
        map(exp => exp ? this.filterExpertise(exp) : this.expertiseList)
      );
  }

  getAllExpertise(){
    this.restService.get('expertise').subscribe(
      (data) => {
        console.log(data);
        this.expertiseList = data;
      },
      (err) => {
        console.error(err);
        this.expertiseList = [];
      }
    );
  }

  getUserExpertise(){
    if(!this.personId)
      return;

    this.restService.get('user/' + this.personId + '/expertise').subscribe(
      (data) => {
        console.log(data);
        this.userExpertiseList = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  filterExpertise(name: string) {
    return this.expertiseList.filter(exp => exp.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
