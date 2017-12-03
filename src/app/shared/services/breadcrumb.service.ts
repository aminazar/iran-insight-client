import {Injectable} from '@angular/core';
import {Breadcrumb} from '../interfaces/breadcrumb.interface';
import {ReplaySubject} from 'rxjs/ReplaySubject';


@Injectable()
export class BreadcrumbService {


  private routes: Breadcrumb[] = [];
  private routesRS = new ReplaySubject<Breadcrumb[]>(0);
  routes$ = this.routesRS.asObservable();

  constructor() {

  }

  pushChild(label: String, url: String, reset: boolean = false) {

    if (reset)
      this.routes = [];

    if (this.routes.filter(e => e.label === label).length === 0) {
      const child: Breadcrumb = {
        label,
        url
      };
      this.routes.push(child);
    } else {
      this.routes.length = this.routes.findIndex(e => e.label === label);
    }
    this.routesRS.next(this.routes);

  }

}
