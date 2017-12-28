import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProgressService} from '../../shared/services/progress.service';
import {RestService} from '../../shared/services/rest.service';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {IPartnership} from './interfaces/partnership.interface';

@Component({
  selector: 'ii-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.scss']
})
export class PartnershipComponent implements OnInit {


  personId: number = null;
  personName: string = null;

  cards: IPartnership[] = [];

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
      this.personId = params['id'];
      this.personName = decodeURIComponent(params['personName']);

      this.breadCrumbService.pushChild(`Partnerships of ${this.personName}`, this.router.url, false);

    });

    this.searching();

  }

  open(state: string, id: number = null) {
    this.cardId = id;
    this.router.navigate(id ? [state, id] : [state, ''], {relativeTo: this.activatedRoute});
  }

  deletePartnership(id: number = null) {
    if (!id)
      return;

    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(res => {

      if (res) {

        this.progressService.enable();
        this.restService.delete(`person/partnership/${id}`).subscribe(data => {

          this.progressService.disable();
          this.cardId = null;

          this.snackBar.open('partnership has been deleted', null, {
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
    this.restService.get(`person/partnership/${this.personId}/${this.offset}/${this.limit}`).subscribe(res => {

      res.forEach((partnership: IPartnership) => {
        this.cards.push(partnership);
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

  /*
  key : possessor or joiner
   */
  getBestName(key: string, partnership: IPartnership) {

    if (partnership[`${key}_display_name`])
      return partnership[`${key}_display_name`];
    if (partnership[`${key}_display_name_fa`])
      return partnership[`${key}_display_name_fa`];

    return '';
  }

}
