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
  styleUrls: ['./lce.component.scss']
})
export class LCEComponent implements OnInit {


  companyType: string;
  companyId: number = null;
  companyName: string = null;

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
      this.companyType = this.router.url.split('/')[2];
      this.companyId = params['id'];
      this.companyName = decodeURIComponent(params['companyName']);

      this.breadCrumbService.pushChild(`life cycle events of ${this.companyName}`, this.router.url, false);

    });

    this.searching();

  }

  open(state: string, id: number = null) {
    this.cardId = id;
    this.router.navigate(id ? [state, id] : [state, ''], {relativeTo: this.activatedRoute});
  }

  deleteLCE(id: number = null) {
     if (!id)
      return;

    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(res => {

      if (res) {

        this.progressService.enable();
        this.restService.delete(`lce/${this.companyType}/${id}`).subscribe(data => {

          this.progressService.disable();
          this.cardId = null;

          this.snackBar.open('life cycle event has been deleted', null, {
            duration: 3200,
          });

          this.searching();
        }, err => {

          this.progressService.disable();
        });
      }
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
    this.restService.get(`lce/${this.companyType}/${this.companyId}/${this.offset}/${this.limit}`).subscribe(res => {

      res.forEach((lce: ILCE) => {
        this.cards.push(lce);
      });
      this.totalCards = this.cards.length > 0 ? this.cards[0].total : 0;
      this.aligningItems();
      this.progressService.disable();
    }, err => {
      this.progressService.disable();
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
