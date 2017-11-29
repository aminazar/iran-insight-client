import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";

import {AuthService} from "../shared/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isLoggedIn.map((res: boolean) => {
      console.log('-> ',res);

      if(res)
        return true;

      this.router.navigate(['admin/login']);
      return false;
    });
  }
}
