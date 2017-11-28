import {Component, Input, OnInit} from '@angular/core';

import {SearchService} from "../../../shared/services/search.service";

@Component({
  selector: 'ii-admin-filter-tab',
  templateUrl: './filter-tab.component.html',
  styleUrls: ['./filter-tab.component.css']
})
export class AdminFilterTabComponent implements OnInit {
  @Input() tabInfo;
  @Input()
  set isActiveTab(data: boolean){
    this._isActiveTab = data;
    this.search();
  }
  get isActiveTab(){
    return this._isActiveTab;
  }

  _isActiveTab: boolean = false;

  searchOffset = null;
  searchData = null;

  constructor(private searchService: SearchService) { }

  ngOnInit() {

  }

  search(){
    if(!this.searchData || !this.isActiveTab)
      return;

    this.searchService.search(this.searchData, this.searchOffset).subscribe(
      (data) => {
        console.log('received data: ', data);
      },
      (err) => {
        console.log('error: ', err);
      }
    )
  }

  getResult(value){
    this.searchData = value;
    this.search();
  }

  changeOffset(offset){
    this.searchOffset = offset ? offset : 0;
    this.search();
  }
}
