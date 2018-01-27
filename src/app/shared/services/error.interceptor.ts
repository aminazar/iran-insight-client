import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {errors} from '../utils/messages.list';
import {MatSnackBar} from '@angular/material';
import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((err: HttpErrorResponse) => {

        if (err.error instanceof Error) {
          console.error('An error occurred:', err.error.message);
        } else {
          let found = false;
          errors.forEach(e => {
            if (err.error === e.error.message && err.status === e.code) {
              if (e.friendlyMessage.length > 0)
                this.snackBar.open(e.friendlyMessage, 'Dismiss');
              found = true;
            }
          });
          if (!found) {
            this.snackBar.open(err.error.error || err.error, null, {duration: 3000});
          }
          console.error(`Backend returned code ${err.status}, body was: `, err.error);
        }
        return Observable.throw(err);
      });
  }
}
