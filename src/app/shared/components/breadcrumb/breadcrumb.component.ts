import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {IBreadcrumb} from '../../interfaces/breadcrumb.interface';

@Component({
  selector: 'ii-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  items: IBreadcrumb[] = [];

  constructor(private breadCrumbService: BreadcrumbService) {
  }

  ngOnInit() {

    this.breadCrumbService.routes$.subscribe((res: IBreadcrumb[]) => {
      this.items = res;
    });

  }


}
