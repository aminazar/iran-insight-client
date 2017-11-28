import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RestService {

  prefix: string = '/api/';

  constructor(private http: HttpClient) { }




  get(url: string): Observable<any> {
    return this.http.get(this.prefix + url);
  }


}
