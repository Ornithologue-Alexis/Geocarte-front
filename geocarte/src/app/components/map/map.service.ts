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

  constructor(private http: Http) {
  }

  getCartePostale(idUser: string): Promise<VarianteCarte[]> {
    return this.http.get(this.baseUrl + '/varianteCarte/?userId='+idUser)
      .toPromise()
      .then(response => response.json() as VarianteCarte[])
      .catch(this.handleError);
  }

  getCarteById(idVariante: number, idCarte): Promise<VarianteCarte> {
    return this.http.get(this.baseUrl + '/varianteCarte/' + idCarte + '/' + idVariante)
      .toPromise()
      .then(response => response.json() as VarianteCarte)
      .catch(this.handleError);
  }

  addUserOnCard(idCard: number, idVariante:number, idUser:string){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let changes = {
      'idCarte': idCard,
      'idUtilisateur': idUser,
      'idVariante': idVariante,
      'nombreExemplaire': 1
    }
    let body = JSON.stringify(changes);
    return this.http.post(this.baseUrl + '/carteUtilisateur/', body, options).map((res: Response) => res.json().catch(this.handleError));
  }

  addCard(img: string, codeEditeur: number, idCommune: string, idEditor: number, legend: string, lat: string, long: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let changes = {
      "base64": img,
      "codeEditeur": codeEditeur,
      "editeurId": idEditor,
      "insee": idCommune,
      "latitude": +lat,
      "legende": legend,
      "longitude": +long,
    };
    let body = JSON.stringify(changes);
    return this.http.post(this.baseUrl + '/cartePostale/', body, options ).map((res: Response) => res.json());
  }

  deleteUserOnCard(idCard: number, idVariante: number, userId: string) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.baseUrl + '/carteUtilisateur/' + userId + '/' + idVariante + '/' + idCard, options)
      .map((res: Response) => res.json());
  }

  createCard(cardData: CartePostale): Promise<CartePostale> {
    return this.http.post(this.baseUrl + '/varianteCarte/', cardData)
      .toPromise().then(response => response.json() as CartePostale)
      .catch(this.handleError);
  }

  changeLatLngMarker(id: number, lng: number, lat: number) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let changes = {
      'id': id,
      'latitude': lat,
      'longitude': lng,
    };
    let body = JSON.stringify(changes);
    return this.http.put(this.baseUrl + '/coordonneesCarte/' + id, body, options).map((res: Response) => res.json().catch(this.handleError));
  }

  getUsersOfCarte(idvariante: any): Promise<boolean>{
    return this.http.get(this.baseUrl + '/usersId/'+idvariante+'/')
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
