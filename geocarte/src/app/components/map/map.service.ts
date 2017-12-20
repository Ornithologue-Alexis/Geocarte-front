import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

/**
 * @title Dialog Overview
 */

@Injectable()
export class MapService {

  private baseUrl = 'http://localhost:8080/geocarte/api';

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

  createCard(cardData: CartePostale): Promise<CartePostale> {
    return this.http.post(this.baseUrl + '/varianteCarte/', cardData)
      .toPromise().then(response => response.json() as CartePostale)
      .catch(this.handleError);
  }

  changeLatLngMarker(id:number, lng: number, lat: number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let changes = {
      'id': id,
      'latitude': lat,
      'longitude': lng,
    };
    let body = JSON.stringify(changes);
    console.log(body);
    return this.http.put(this.baseUrl + '/coordonneesCarte/'+id, body, options ).map((res: Response) => res.json().catch(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
