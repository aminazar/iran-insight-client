import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable()
export class RestService {
  constructor(private http: HttpClient) {
  }

  get(url): Observable<any> {
    return this.http.get('/api/' + url, {observe: 'response'}).map(data => data.body);
  }

  put(url, values): Observable<any> {
    return this.http.put('/api/' + url, values, {observe: 'response'}).map(data => data.body);
  }

  post(url, values): Observable<any> {
    return this.http.post('/api/' + url, values, {observe: 'response'}).map(data => data.body);
  }

  delete(url): Observable<any> {
    return this.http.delete('/api/' + url, {observe: 'response'});
  }


  // getWithParams(table, values): Observable<any> {
  //   let params = [];
  //   for (let key in values)
  //     if (values.hasOwnProperty(key))
  //       params.push(key + '=' + values[key]);
  //
  //   return this.call(table + '?' + params.join('&')).map((data: Response) => data.json());
  // }

}
