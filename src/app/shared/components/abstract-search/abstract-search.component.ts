import {Component, OnInit} from '@angular/core';
import {ActionEnum} from '../../enum/action.enum';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {SearchService} from '../../services/search.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../services/progress.service';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';
import {RemovingConfirmComponent} from '../removing-confirm/removing-confirm.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ii-abstract-search',
  template: ``,
  styles: []
})
export class AbstractSearchComponent implements OnInit {
  offset = 0;
  limit = 8;
  cards = [];
  totalCards: number = null;
  cardId: number = null;
  searchData: any = null;
  aligningObj = {};
  rows = [];
  searchInFirst = true;
  initSearchData: any = null;
  viewName: string;
  key: string;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, protected snackBar: MatSnackBar,
              private progressService: ProgressService, private dialog: MatDialog,
              protected authService: AuthService, private storageService: StorageService) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild(this.viewName, this.router.url, true);

    const preData = this.storageService.getData(this.viewName.toLowerCase());
    if (preData) {
      this.searchData = preData.searchData;
      this.cardId = preData.cardId;
      this.offset = preData.offset;
      this.limit = preData.limit;
      this.searchInFirst = false;

      this.initSearchData = this.searchData;
      this.searching();
    }
  }

  openForm(id: number = null, url: string): void {
    this.cardId = id;
    this.storageService.saveData(this.key, {
      searchData: this.searchData,
      cardId: this.cardId,
      offset: this.offset,
      limit: this.limit,
    });
    this.router.navigate([url + '/' + id]);
  }

  openView(id: number = null, url: string): void {
    this.cardId = id;
    this.storageService.saveData(this.key, {
      searchData: this.searchData,
      cardId: this.cardId,
      offset: this.offset,
      limit: this.limit,
    });
    this.router.navigate([url + '/' + id]);
  }

  deleteCard(id: number = null): Observable<any> {
    this.cardId = id;
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    return rmDialog.afterClosed();
  }

  search(data, key: string) {
    this.searchData = data;
    this.cardId = null;
    this.searching();
  }

  changeOffset(data) {
    this.limit = data.pageSize ? data.pageSize : 10;
    this.offset = data.pageIndex * this.limit;
    this.searching();
  }

  searching() {

    this.progressService.enable();
    this.searchService.search(this.searchData, this.offset, this.limit).subscribe(
      (data) => {
        this.cards = data[this.key];
        this.totalCards = this.cards && this.cards.length > 0 ? parseInt(this.cards[0].total, 10) : 0;
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
    if (this.totalCards <= 0) {
      this.aligningObj = {};
      this.rows = [];
      return;
    }

    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.cards.length > 0 ? {0: []} : {};
    this.cards.forEach(el => {
      if (colCounter > 3) {
        this.aligningObj[++rowCounter] = [];
        colCounter = 0;
      }

      this.aligningObj[rowCounter].push(el);
      colCounter++;
    });

    this.rows = Object.keys(this.aligningObj);
  }

  select(id: number = null) {
    if (this.cardId === id)
      this.cardId = null;
    else
      this.cardId = id;
  }
}
