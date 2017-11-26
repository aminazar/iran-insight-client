import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {Breadcrumb} from '../../interfaces/breadcrumb.interface';

@Component({
  selector: 'ii-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  items: Breadcrumb[] = [];

  constructor(private breadCrumbService: BreadcrumbService) {
  }

  ngOnInit() {

    this.breadCrumbService.bcRoutes().subscribe((res: Breadcrumb[]) => {
      this.items = res;
    });

  }


}
