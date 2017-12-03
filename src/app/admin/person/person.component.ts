import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';

import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {PersonFormComponent} from './components/person-form/person-form.component';
import {SearchService} from '../../shared/services/search.service';

@Component({
  selector: 'ii-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  offset = 0;
  people = [];
  personId: number = null;
  showInDeep = false;

  constructor(private router: Router, private breadCrumbService: BreadcrumbService,
              private searchService: SearchService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.breadCrumbService.pushChild('person', this.router.url, true);
  }

  openForm(id: number): void {
     // Navigate to new page (3 tabs: Information, Expertise and Partnership)
    this.personId = id;
    this.showInDeep = true;
  }

  search(data) {
    this.searchService.search(data, this.offset).subscribe(
      (data) => {
        this.people = data.person;
      },
      (err) => {
        console.error('Cannot get data', err);
        this.snackBar.open('Cannot get data. Please check your connection', null, {
          duration: 3000,
        });
      }
    );
  }

  showDetails(pid) {
    this.personId = pid;
    this.showInDeep = true;
  }
}
