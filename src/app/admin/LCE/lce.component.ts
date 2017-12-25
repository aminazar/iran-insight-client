import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProgressService} from '../../shared/services/progress.service';
import {RestService} from '../../shared/services/rest.service';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {ILCE} from './interfaces/lce.interface';

@Component({
  selector: 'ii-lce',
  templateUrl: './lce.component.html',
  styleUrls: ['./lce.component.css']
})
export class LCEComponent implements OnInit {


  possessorType: string;
  possessorId: number = null;
  possessorName: string = null;
  cards: ILCE[] = [];

  offset = 0;
  limit = 8;
  totalCards: number = null;
  cardId: number = null;
  aligningObj = {};
  rows = [];


  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private snackBar: MatSnackBar,
              private progressService: ProgressService,
              private activatedRoute: ActivatedRoute,
              private restService: RestService,
              private dialog: MatDialog) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.possessorType = this.router.url.split('/')[2];
      this.possessorId = params['id'];

      this.progressService.enable();

    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.possessorName = params['possessorName'] || '';
      this.breadCrumbService.pushChild(this.possessorName !== '' ? `lce for ${this.possessorName} ` : 'lce', this.router.url, false);

    });

    this.searching();

  }

  open(state: string, id: number = null) {
    this.cardId = id;
    this.router.navigate(id ? [state, id] : [state, ''], {relativeTo: this.activatedRoute , queryParams: {possessorName: this.possessorName}});
  }

  deleteLCE(id: number = null) {
    this.cardId = id;
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(res => {

    }, err => {

    });
  }

  changeOffset(data) {
    this.limit = data.pageSize ? data.pageSize : 10;
    this.offset = data.pageIndex * this.limit;
    this.searching();
  }

  searching() {

    this.cards = [];
    this.progressService.enable();
    this.restService.get(`lce/${this.possessorType}/${this.possessorId}/${this.offset}/${this.limit}`).subscribe(res => {

      res.forEach((lce: ILCE) => {
        this.cards.push(lce);
      });
      this.totalCards = this.cards.length > 0 ? this.cards[0].total : 0;
      this.aligningItems();
      this.progressService.disable();
    }, err => {
      this.progressService.disable();
      this.snackBar.open('Cannot get data. Please check your connection');
    });
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
