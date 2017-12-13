import {Component, OnInit} from '@angular/core';
import {ActionEnum} from "../../shared/enum/action.enum";
import {BreadcrumbService} from "../../shared/services/breadcrumb.service";
import {SearchService} from "../../shared/services/search.service";
import {MatSnackBar} from "@angular/material";
import {ProgressService} from "../../shared/services/progress.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ii-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  offset = 0;
  limit = 0;
  events = [];
  eventId: number = null;
  showInDeep: boolean = false;
  searchData: any = null;
  actionEnum = ActionEnum;
  totalEvents: number = null;
  aligningObj = {};
  rows = [];

  constructor(private breadCrumService: BreadcrumbService, private searchService: SearchService,
              private snackBar: MatSnackBar, private progressService: ProgressService,
              private router: Router) {
  }

  ngOnInit() {
    this.breadCrumService.pushChild('Event', this.router.url, true);
  }

  openForm(id: number): void {
    this.eventId = id;
    this.showInDeep = true;
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
        this.totalEvents = this.events.length > 0 ? parseInt(this.events[0].total) : 0;

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
    )
  }

  aligningItems(){
    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.events.length > 0 ? {0: []} : {};
    this.events.forEach(el => {
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
    switch (data.action){
      case this.actionEnum.add: {
        this.events.unshift(data.value);
        this.events = this.events.slice(0, this.events.length - 1);
        this.aligningItems();
      }
      break;
      case this.actionEnum.modify: {
        this.events[this.events.findIndex(el => el.eid === data.value.eid)] = data.value;
        this.aligningItems();
      }
      break;
      case this.actionEnum.delete: {
        this.events = this.events.filter(el => el.eid !== data.value);
        this.showInDeep = false;
        this.eventId = null;
        this.searching();
      }
      break;
    }
  }

  checkWithSearch(data){
    let isMatched = false;

    if(this.searchData.phrase && this.searchData.phrase.trime() !== ''){
      ['title', 'title_fa', 'address', 'address_fa', 'description', 'description_fa'].forEach(el => {
        if(new RegExp(this.searchData.phrase.toLowerCase()).test(data[el].toLowerCase()))
          isMatched = true;
      });
    }

    if(this.searchData.options.start_date !== null){
      
    }

    if(this.searchData.options.end_date !== null){

    }

    return isMatched;
  }
}
