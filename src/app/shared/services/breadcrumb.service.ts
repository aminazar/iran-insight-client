import {Injectable} from '@angular/core';
import {IBreadcrumb} from '../interfaces/breadcrumb.interface';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Location} from "@angular/common";


@Injectable()
export class BreadcrumbService {


  private routes: IBreadcrumb[] = [];
  private routesRS = new ReplaySubject<IBreadcrumb[]>(0);
  routes$ = this.routesRS.asObservable();

  constructor(private location: Location) {

  }

  pushChild(label: String, url: String, reset: boolean = false) {
    if (reset)
      this.routes = [];

    if (this.routes.filter(e => e.label === label).length === 0) {
      const child: IBreadcrumb = {
        label,
        routerLink: url
      };
      this.routes.push(child);
    } else {
      this.routes.length = this.routes.findIndex(e => e.label === label) + 1;
    }
    this.routesRS.next(this.routes);
  }

  popChild(){
    this.routes.pop();
    this.location.back();
    this.routesRS.next(this.routes);
  }
}
