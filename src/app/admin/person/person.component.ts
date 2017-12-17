import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {ActionEnum} from '../../shared/enum/action.enum';
import {ProgressService} from '../../shared/services/progress.service';

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
  selectedIndex: number = 0;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, private snackBar: MatSnackBar,
              private progressService: ProgressService) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('Person', this.router.url, true);
  }

  openForm(id: number = null): void {
     // Navigate to new page (3 tabs: Information, Expertise and Partnership)
    this.personId = id;
    this.showInDeep = true;
    this.selectedIndex = 0;
  }

  search(data) {
    this.searchData = data;
    this.searching();
  }

  changeOffset(data) {
    this.limit = data.pageSize ? data.pageSize : 10;
    this.offset = data.pageIndex * this.limit;
    this.searching();
  }

  searching() {
    this.showInDeep = false;
    this.personId = null;

    this.progressService.enable();
    this.searchService.search(this.searchData, this.offset, this.limit).subscribe(
      (data) => {
        this.people = data.person;
        this.totalPeople = this.people && this.people.length > 0 ? parseInt(this.people[0].total) : 0;
        this.aligningItems();
        this.progressService.disable();
      },
      (err) => {
        console.error('Cannot get data', err);
        this.snackBar.open('Cannot get data. Please check your connection', null, {
          duration: 3000,
        });
        this.progressService.disable();
      }
    );
  }

  aligningItems() {
    if(this.totalPeople <= 0){
      this.aligningObj = {};
      this.rows = [];
      return;
    }

    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.people.length > 0 ? {0: []} : {};
    this.people.forEach(el => {
      if (colCounter > 4) {
        this.aligningObj[++rowCounter] = [];
        colCounter = 0;
      }

      this.aligningObj[rowCounter].push(el);
      colCounter++;
    });

    this.rows = Object.keys(this.aligningObj);
  }

  applyChanges(data) {
    switch (data.action) {
      case this.actionEnum.add: {
        if(this.limit > this.people.length && this.checkWithSearch(data)){
          this.people.push(data.value);
          this.aligningItems();
        }

        this.totalPeople++;
      }
        ;
        break;
      case this.actionEnum.modify: {
        if(this.checkWithSearch(data.value)){
          this.people[this.people.findIndex(el => el.pid === data.value.pid)] = data.value;
          this.aligningItems();
        }
        else
          this.searching();
      }
        ;
        break;
      case this.actionEnum.delete: {
        this.showInDeep = false;
        this.personId = null;
        this.searching();
      }
        ;
        break;
    }
  }

  checkWithSearch(data) {
    if (!this.searchData.phrase || this.searchData.phrase.trim() === '')
      return true;

    let isMatched = false;

    ['firstname_en', 'firstname_fa', 'surname_en', 'surname_fa', 'username', 'address_en', 'address_fa', 'display_name_en', 'display_name_fa'].forEach(el => {
      if (new RegExp(this.searchData.phrase.toLowerCase()).test(data[el] ? data[el].toLowerCase() : null))
        isMatched = true;
    });

    return isMatched;
  }
}
