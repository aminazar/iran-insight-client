import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {illegalTypeName, noType} from '../utils/messages.list';
import {MatSnackBar} from '@angular/material';
import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar:  MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((err: HttpErrorResponse) => {

        if (err.error instanceof Error) {
          console.error('An error occurred:', err.error.message);
        } else {
          if (err.error === illegalTypeName.error.message && err.status === illegalTypeName.code)
            this.snackBar.open(illegalTypeName.friendlyMessage);
          else if (err.error === noType.error.message && err.status === noType.code)
            this.snackBar.open(noType.friendlyMessage);

          console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        return  Observable.throw(err);
      });
  }
}
