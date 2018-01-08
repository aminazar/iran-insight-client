import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../shared/services/rest.service';
import {ProgressService} from '../../shared/services/progress.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {RemovingConfirmComponent} from '../../shared/components/removing-confirm/removing-confirm.component';

@Component({
  selector: 'ii-consultancy',
  templateUrl: './consultancy.component.html',
  styleUrls: ['./consultancy.component.css']
})
export class ConsultancyComponent implements OnInit {
  id = null;
  consultancyRelationName = '';
  isConsulting = false;
  isPerson = false;
  isOrg = false;
  isBiz = false;
  aligningObj = {};
  rows = [];
  consultancyList = [];
  breadcrumbIsSet = false;

  constructor(private breadcrumbService: BreadcrumbService, private router: Router,
              private route: ActivatedRoute, private restService: RestService,
              private snackBar: MatSnackBar, private progressService: ProgressService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.consultancyRelationName = params['name'] ? params['name'] : null;
        this.consultancyRelationName = this.consultancyRelationName.replace(/%20/g, ' ');

        const type = params['type'] ? params['type'] : null;

        this.isPerson = this.router.url.toLowerCase().includes('person') ? true : false;
        this.isBiz = this.router.url.toLowerCase().includes('business') ? true : false;
        this.isOrg = this.router.url.toLowerCase().includes('organization') ? true : false;

        this.isConsulting = (this.isPerson || this.isOrg);
        if (!this.breadcrumbIsSet) {
          this.breadcrumbService.pushChild('Consultancy' +
            (this.isConsulting ? ' of ' : ' on ') +
            this.consultancyRelationName, this.router.url, false);

          this.breadcrumbIsSet = true;
          this.id = params['id'] ? +params['id'] : null;
          this.getConsultancies();
        }
      },
      (err) => {
        console.error('Cannot parse parameters from url: ', err);
      }
    );
  }

  open(type, id) {
    if (type === 'view')
      this.router.navigate(['/admin/consultancy/view/' +
      (this.isBiz ? '' : (this.isPerson ? 'person/' : 'organization/')) +
      this.isConsulting + '/' + this.id + '/' + id]);
    else if (type === 'from')
      this.router.navigate(['/admin/consultancy/form/' +
      (this.isBiz ? '' : (this.isPerson ? 'person/' : 'organization/')) +
      this.isConsulting + '/' + this.id + '/' + id]);
  }

  deleteConsultancy(id) {
    const rmDialog = this.dialog.open(RemovingConfirmComponent, {
      width: '400px',
    });

    rmDialog.afterClosed().subscribe(
      (data) => {
        if (data)
          this.restService.delete('consultancy/' + id).subscribe(
            (rs) => {
              this.consultancyList = this.consultancyList.filter(el => el.id !== id);
              this.aligningItems();
              this.snackBar.open('The consultancy is deleted successfully', null, {
                duration: 2300,
              });
            },
            (err) => {
              console.error('Cannot delete consultancy: ', err);
            }
          );
      },
      (err) => {
        console.error('Error when closing dialog: ', err);
      }
    );
  }

  getConsultancies() {
    if (this.id && (this.isPerson || this.isBiz || this.isOrg)) {
      let url = 'consultancy/';
      if (this.isPerson)
        url += 'person/';
      else if (this.isBiz)
        url += 'business/';
      else if (this.isOrg)
        url += 'organization/';
      url += 'all/' + this.id;

      this.progressService.enable();
      this.restService.get(url).subscribe(
        (data) => {
          this.consultancyList = data;
          this.aligningItems();
          this.progressService.disable();
        },
        (err) => {
          this.progressService.disable();
        }
      );
    }
  }

  aligningItems() {
    let colCounter = 0;
    let rowCounter = 0;
    this.aligningObj = this.consultancyList.length > 0 ? {0: []} : {};
    this.consultancyList.forEach(el => {
      if (colCounter > 3) {
        this.aligningObj[++rowCounter] = [];
        colCounter = 0;
      }

      this.aligningObj[rowCounter].push(el);
      colCounter++;
    });

    this.rows = Object.keys(this.aligningObj);
  }
}
