import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {ActionEnum} from '../../shared/enum/action.enum';
import {ProgressService} from '../../shared/services/progress.service';
import {AuthService} from '../../shared/services/auth.service';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {PersonViewComponent} from './components/person-view/person-view.component';

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
              private progressService: ProgressService, public dialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('Person', this.router.url, true);
  }

  openForm(id: number = null): void {
     // Navigate to new page (3 tabs: Information, Expertise and Partnership)
    this.personId = id;
    this.router.navigate(['/admin/person/form/' + id]);
  }

  openView(id: number = null): void {
    this.personId = id;
    this.router.navigate(['/admin/person/' + id]);
  }

  deletePerson(id: number = null): void {
    this.personId = id;
    let rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (res) => {
        if (res)
          this.authService.deletePerson(id).subscribe(
            (data) => {
              this.personId = null;
              this.snackBar.open('Person is deleted successfully', null, {
                duration: 2300
              });
              this.searching();
            },
            (err) => {
              console.error('Cannot delete this person. Error: ', err);
              this.snackBar.open('Cannot delete this person. Please try again.', null, {
                duration: 3200
              });
            }
          );
      },
      (err) => console.error('Error in closing component. Error: ', err)
    );
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
    if (this.totalPeople <= 0) {
      this.aligningObj = {};
      this.rows = [];
      return;
    }

    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.people.length > 0 ? {0: []} : {};
    this.people.forEach(el => {
      if (colCounter > 3) {
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
        if (this.limit > this.people.length && this.checkWithSearch(data.value)) {
          this.people.push(data.value);
          this.aligningItems();
        }

        this.totalPeople++;
      }
        break;
      case this.actionEnum.modify: {
        if (this.checkWithSearch(data.value)) {
          this.people[this.people.findIndex(el => el.pid === data.value.pid)] = data.value;
          this.aligningItems();
        }
        else
          this.searching();
      }
        break;
      case this.actionEnum.delete: {
        this.showInDeep = false;
        this.personId = null;
        this.searching();
      }
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

  select(id: number = null) {
    if (this.personId === id)
      this.personId = null;
    else
      this.personId = id;
  }
}
