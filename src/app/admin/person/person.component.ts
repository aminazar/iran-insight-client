import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {ActionEnum} from '../../shared/enum/action.enum';

@Component({
  selector: 'ii-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  offset = 0;
  limit = 10;
  people = [];
  personId: number = null;
  showInDeep = false;
  searchData: any = null;
  actionEnum = ActionEnum;
  totalPeople: number = null;
  aligningObj = {};
  rows = [];

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('person', this.router.url, true);
  }

  openForm(id: number): void {
     // Navigate to new page (3 tabs: Information, Expertise and Partnership)
    this.personId = id;
    this.showInDeep = true;
  }

  search(data) {
    this.searchData = data;
    this.searching();
  }

  changeOffset(data){
    this.limit = data.pageSize ? data.pageSize : 10;
    this.offset = data.pageIndex * this.limit;
    this.searching();
  }

  searching(){
    this.showInDeep = false;
    this.personId = null;

    this.searchService.search(this.searchData, this.offset, this.limit).subscribe(
      (data) => {
        this.people = data.person;
        this.totalPeople = this.people.length > 0 ? parseInt(this.people[0].total) : 0;

        let colCounter = 0;
        let rowCounter = 0;
        this.aligningObj = this.people.length > 0 ? {0: []} : {};
        this.people.forEach(el => {
          if(colCounter > 4){
            this.aligningObj[++rowCounter] = [];
            colCounter = 0;
          }

          this.aligningObj[rowCounter].push(el);
          colCounter++;
        });

        this.rows = Object.keys(this.aligningObj);
        console.log(this.aligningObj);
      },
      (err) => {
        console.error('Cannot get data', err);
        this.snackBar.open('Cannot get data. Please check your connection', null, {
          duration: 3000,
        });
      }
    );
  }

  applyChanges(data){
    console.log('In applyChanges: ', data);

    switch (data.action){
      case this.actionEnum.add: {
        this.people.unshift(data.value);
        this.people = this.people.slice(0,this.people.length - 1);
      };
      break;
      case this.actionEnum.modify: {
        this.people[this.people.findIndex(el => el.pid === data.value.pid)] = data.value;
      };
      break;
      case this.actionEnum.delete: {
        this.people = this.people.filter(el => el.pid !== data.value);
        this.showInDeep = false;
        this.personId = null;
        this.searching();
      };
      break;
    }
  }
}
