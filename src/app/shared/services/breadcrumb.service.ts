import {Injectable} from '@angular/core';
import {Breadcrumb} from '../interfaces/breadcrumb.interface';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BreadcrumbService {


  private routes: Breadcrumb[] = [];
  private routes$ = new ReplaySubject<Breadcrumb[]>();


  constructor() {

  }

  /**
   * bc => BreadCrumb
   * @returns {Observable<Breadcrumb[]>}
   */
  bcRoutes(): Observable<Breadcrumb[]> {
    return this.routes$.asObservable();
  }

  pushChild(label: String, url: String) {
    if (this.routes.filter(e => e.label === label).length === 0) {
      let child: Breadcrumb = {
        label,
        url
      };
      this.routes.push(child);
    }
    this.routes$.next(this.routes);

  }

  popChild() {

    this.routes.pop();
    this.routes$.next(this.routes);
  }


}
