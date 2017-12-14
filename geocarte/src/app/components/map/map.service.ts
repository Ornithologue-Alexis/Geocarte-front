import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';

/**
 * @title Dialog Overview
 */

@Injectable()
export class MapService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) {}

  getCartePostale():  Promise<VarianteCarte[]> {
    return this.http.get(this.baseUrl + '/varianteCarte/')
      .toPromise()
      .then(response => response.json() as VarianteCarte[])
      .catch(this.handleError);
  }

  getCarteById(idVariante : number, idCarte):  Promise<VarianteCarte> {
    return this.http.get(this.baseUrl + '/varianteCarte/'+idCarte+'/'+idVariante)
      .toPromise()
      .then(response => response.json() as VarianteCarte)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
