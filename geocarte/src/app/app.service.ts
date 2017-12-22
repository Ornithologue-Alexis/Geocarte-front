import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class AppService {

  baseUrl = 'http://localhost:8080/geocarte/api';

  constructor(private http: Http) {
  }

  activateUser(token: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let changes = {
    };
    let body = JSON.stringify(changes);
    return this.http.post(this.baseUrl + '/activation/' + token, body, options ).map((res: Response) => res.json());
  }
}
