import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";

@Injectable()
export class RestService {
  constructor(private http: HttpClient) {
  }

  call(table): Observable<any> {
    return this.http.get('/api/' + table, {observe: 'response'});
  }

  put(url, values): Observable<any> {
    return this.http.put('/api/' + url, values).map((data: Response) => data.body);
  }

  get(url): Observable<any> {
    return this.call(url).map((data: Response) => data.body);
  };

  getWithParams(table, values): Observable<any> {
    let params = [];
    for (let key in values)
      if (values.hasOwnProperty(key))
        params.push(key + '=' + values[key]);

    return this.call(table + '?' + params.join('&')).map((data: Response) => data.json());
  }

  delete(url, id): Observable<any> {
    return this.http.delete('/api/' + url + '/' + id, {observe: 'response'});
  }

  post(url, values): Observable<any>{
    return this.http.post('/api/' + url, values, {observe: 'response'}).map(data => data.body);
  }
}
