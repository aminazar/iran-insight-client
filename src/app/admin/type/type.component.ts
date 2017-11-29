import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbService} from '../../shared/services/breadcrumb.service';
import {MatDialog} from '@angular/material/dialog';
import {TypeFormComponent} from './type-form/type-form.component';

@Component({
  selector: 'ii-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  constructor(private router: Router, private breadCrumbService: BreadcrumbService, private dialog: MatDialog) {
  }

  type1 = {
    id : 1,
    type: 'lce',
    name: 'merge',
    name_fa: 'اتحاد',
    active: true
  };


  ngOnInit() {
    this.breadCrumbService.pushChild('type', this.router.url);
  }

  openForm(id: number): void {
    let dialogRef = this.dialog.open(TypeFormComponent, {
      width: '600px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


}
