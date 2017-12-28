import {Injectable} from "@angular/core";
import {CanDeactivate} from "@angular/router";
import {Observable} from "rxjs/Observable";

export interface CanComponentDeactivate {
  checkOnLeave: boolean;
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class LeavingGuard implements CanDeactivate<CanComponentDeactivate>{
  constructor(){}

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean{
    return component.checkOnLeave ? component.canDeactivate() : true;
  }
}
