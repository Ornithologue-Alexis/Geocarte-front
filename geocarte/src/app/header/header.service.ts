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


  getTypeMonuments():  Promise<TypeMonument[]> {
    return this.http.get(this.baseUrl + '/typeMonument/')
      .toPromise()
      .then(response => response.json() as TypeMonument[])
      .catch(this.handleError);
  }

  getEditeurs(): Promise<Editeur[]> {
    return this.http.get(this.baseUrl + '/editeur/')
      .toPromise()
      .then(response => response.json() as Editeur[])
      .catch(this.handleError);
  }

  getLegendes(): Promise<string[]> {
    return this.http.get(this.baseUrl + '/legende/')
      .toPromise()
      .then(response => response.json() as Editeur[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }


}
