import {Component, OnInit} from '@angular/core';
import {ActionEnum} from '../../shared/enum/action.enum';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {SearchService} from '../../shared/services/search.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProgressService} from '../../shared/services/progress.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {EventFormComponent} from './components/event-form/event-form.component';
import {EventViewComponent} from './components/event-view/event-view.component';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';
import {RestService} from '../../shared/services/rest.service';
import {StorageService} from '../../shared/services/storage.service';

@Component({
  selector: 'ii-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  offset = 0;
  limit = 8;
  events = [];
  eventId: number = null;
  showInDeep = false;
  searchData: any = null;
  actionEnum = ActionEnum;
  totalEvents: number = null;
  aligningObj = {};
  rows = [];
  searchInFirst = true;
  initSearchData: any = null;

  constructor(private breadCrumService: BreadcrumbService, private searchService: SearchService,
              private snackBar: MatSnackBar, private progressService: ProgressService,
              private router: Router, public dialog: MatDialog,
              private restService: RestService, private storageService: StorageService) {
  }

  ngOnInit() {
    this.breadCrumService.pushChild('Event', this.router.url, true);

    const preData = this.storageService.getData('event');
    if (preData) {
      this.searchData = preData.searchData;
      this.eventId = preData.eventId;
      this.offset = preData.offset;
      this.limit = preData.limit;
      this.searchInFirst = false;

      this.initSearchData = this.searchData;
      this.searching();
    }
  }

  openForm(id?: number): void {
    this.eventId = id;
    this.storageService.saveData('event', {
      searchData: this.searchData,
      eventId: this.eventId,
      offset: this.offset,
      limit: this.limit,
    });
    this.router.navigate(['/admin/event/form/' + this.eventId]);
  }

  openView(id: number = null): void {
    this.eventId = id;
    this.storageService.saveData('event', {
      searchData: this.searchData,
      eventId: this.eventId,
      offset: this.offset,
      limit: this.limit,
    });
    this.router.navigate(['/admin/event/' + this.eventId]);
  }

  deleteEvent(id: number = null): void {
    this.eventId = id;
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (res) => {
        if (res)
          this.restService.delete('event/' + id).subscribe(
            (data) => {
              this.eventId = null;
              this.snackBar.open('Event is deleted successfully', null, {
                duration: 2300,
              });
              this.searching();
            },
            (err) => {
              console.error('Cannot delete this event. Error: ', err);
              this.snackBar.open('Cannot delete this event. Please try again.', null, {
                duration: 3200,
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
    this.eventId = null;

    this.progressService.enable();
    this.searchService.search(this.searchData, this.offset, this.limit).subscribe(
      (data) => {
        this.events = data.event;
        this.totalEvents = this.events && this.events.length > 0 ? parseInt(this.events[0].total, 10) : 0;

        this.aligningItems();
        this.progressService.disable();
      },
      (err) => {
        console.error('Cannot get data', err);
        this.snackBar.open('Cannot get data. Please check your connection', null, {
          duration: 3200,
        });
        this.progressService.disable();
      }
    );
  }

  aligningItems() {
    if (this.totalEvents <= 0) {
      this.aligningObj = {};
      this.rows = [];
      return;
    }

    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.events.length > 0 ? {0: []} : {};
    this.events.forEach(el => {
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
        if (this.limit > this.events.length && this.checkWithSearch(data.value)) {
          this.events.push(data.value);
          this.aligningItems();
        }

        this.totalEvents++;
      }
        break;
      case this.actionEnum.modify: {
        if (this.checkWithSearch(data.value)) {
          this.events[this.events.findIndex(el => el.eid === data.value.eid)] = data.value;
          this.aligningItems();
        } else
          this.searching();
      }
        break;
      case this.actionEnum.delete: {
        this.showInDeep = false;
        this.eventId = null;
        this.searching();
      }
        break;
    }
  }

  checkWithSearch(data) {
    let isMatched = false;

    if (this.searchData.phrase && this.searchData.phrase.trime() !== '') {
      ['title', 'title_fa', 'address', 'address_fa', 'description', 'description_fa'].forEach(el => {
        if (new RegExp(this.searchData.phrase.toLowerCase()).test(data[el] ? data[el].toLowerCase() : null))
          isMatched = true;
      });
    }

    if (this.searchData.options.start_date && this.searchData.options.end_date &&
      moment(data.start_date).isAfter(moment(this.searchData.options.start_date).subtract(1, 'days')) &&
      moment(data.end_date).isBefore(moment(this.searchData.options.end_date).add(1, 'days'))) {
      isMatched = true;
    } else if (this.searchData.options.start_date && !this.searchData.options.end_date &&
      moment(data.start_date).isAfter(moment(this.searchData.options.start_date).subtract(1, 'days'))) {
      isMatched = true;
    } else if (!this.searchData.options.start_date && this.searchData.options.end_date &&
      moment(data.end_date).isBefore(moment(this.searchData.options.end_date).add(1, 'days'))) {
      isMatched = true;
    }

    return isMatched;
  }

  select(id: number = null) {
    if (this.eventId === id)
      this.eventId = null;
    else
      this.eventId = id;
  }
}
