import { Component, OnInit } from '@angular/core';
import {ProgressService} from "../../shared/services/progress.service";
import {SearchService} from "../../shared/services/search.service";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../shared/services/breadcrumb.service";

@Component({
  selector: 'ii-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit {
  offset = 0;
  limit = 10;
  showInDeep = false;
  expertiseId: number = null;
  searchData: any = null;
  totalExpertises: number = null;
  expertises = [];
  rows = [];
  aligningObj = {};
  constructor(private progressService: ProgressService, private searchService: SearchService,
              private snackBar: MatSnackBar, private router: Router,
              private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.pushChild('Expertise', this.router.url, true);
  }

  openForm(id: number = null): void {

  }

  openView(id: number = null): void {

  }

  deleteExpertise(id: number = null): void {

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
    this.expertiseId = null;

    this.progressService.enable();
    this.searchService.search(this.searchData, this.offset, this.limit).subscribe(
      (data) => {
        this.expertises = data.expertise;
        this.totalExpertises = this.expertises && this.expertises.length > 0 ? parseInt(this.expertises[0].total) : 0;
        this.aligningItems();
        this.progressService.disable();
      },
      (err) => {
        console.log('cannot get data', err);
        this.snackBar.open('Cannot get data. Please check your connection', null, {
          duration: 3000,
        });
        this.progressService.disable();
      }
    )
  }

  aligningItems() {
    if(this.totalExpertises <= 0) {
      this.aligningObj = {};
      this.rows = [];
      console.log("don't go!");
      return;
    }

    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.expertises.length > 0? {0: []}: {};
    this.expertises.forEach(el => {
      if(colCounter > 3) {
        this.aligningObj[++rowCounter] = [];
        colCounter = 0;
      }

      this.aligningObj[rowCounter].push(el);
      colCounter++;
    });

    this.rows = Object.keys(this.aligningObj);
  }

  select(id: number = null) {
    if(this.expertiseId === id)
      this.expertiseId = null;
    else
      this.expertiseId = id;
    this.router.navigate(['/admin/expertise/' + id]);
  }
}
