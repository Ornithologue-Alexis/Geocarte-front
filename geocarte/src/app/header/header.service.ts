import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';

/**
 * @title Dialog Overview
 */

@Injectable()
export class HeaderService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) {}

  getCommunes():  Promise<Commune[]> {
    return this.http.get(this.baseUrl + '/commune/')
      .toPromise()
      .then(response => response.json() as Commune[])
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
