import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';

/**
 * @title Dialog Overview
 */

@Injectable()
export class MycardsService {

  baseUrl = 'http://localhost:8080/geocarte/api';

  constructor(private http: Http) {
  }

  getUserCartes(id: string): Promise<any> {

    return this.http.get(this.baseUrl + '/carteUtilisateur/' + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateCardInfo(idCard: number, idVariante: number, idCommune: string, idEditor: number, legend: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let changes = {
      "communeId": idCommune,
      "editeurId": idEditor,
      "legende": legend
    };
    let body = JSON.stringify(changes);
    return this.http.put(this.baseUrl + '/varianteCarte/' + idVariante + '?carteId=' + idCard, body, options ).map((res: Response) => res.json());
  }


  createNewEditor(name: string, code: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let changes = {
      'nom': name,
      'id': 0,
      'code': code
    };
    let body = JSON.stringify(changes);
    return this.http.post(this.baseUrl + '/editeur/', body, options ).map((res: Response) => res.json());
  }

  getAllEditeurs(): Promise<Editeur[]> {
    return this.http.get(this.baseUrl + '/editeur/')
      .toPromise()
      .then(response => response.json() as Editeur[])
      .catch(this.handleError);
  }

  deleteCard(idUser: number, idCard: number, idVariante: number) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.baseUrl + '/carteUtilisateur/' + idUser + '/' + idVariante + '/' + idCard, options)
      .map((res: Response) => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
